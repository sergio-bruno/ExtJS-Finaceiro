<?php
class CnaeService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $cnaeService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new CnaeTable();

		$this->cnaeService = new CnaeService();
	}

	function setCount($val){
		$this->count = $val;
	}
	function setInit($val){
		$this->init = $val;
	}
	function getVOByCD($CD){
		$row = $this->getRowByCD($CD);
		return $this->getVOByRow($row);
	}

	function getRowByCD($CD){
		return $this->tbl->find($CD)->current();
	}

	function getVOByRow(Zend_Db_Table_Row_Abstract $row){
		$vo = new CnaeVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$cnae = $row->findParentRow("CnaeTable");
		if($cnae != null){
			$vo->CNAE_PREDEC = $this->cnaeService->getVOByRow($cnae);
		}else{
			$vo->CNAE_PREDEC = $this->cnaeService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new CnaeVO();
			$vo->CNAE_PREDEC = $this->cnaeService->getVONULL();
		return $vo;
	}

	function getBySelect($query, $paginacao = true){

		$db = Zend_Db_Table::getDefaultAdapter();

		$rows = $db->fetchAll($query);
		$this->totalCount = count($rows);

		if ($paginacao) {
			$query = $query . " LIMIT ". $this->init .",".$this->count;
			$rows = $db->fetchAll($query);
		}

		return $rows;
	}

	function getLastInsertId(){

		$db = Zend_Db_Table::getDefaultAdapter();
		$id = $db->lastInsertId('"cnae"');

		return $id;
	}

	function inserir(CnaeVO $cnae){
		unset($cnae->CNAE);

		try {
			$this->tbl->insert(get_object_vars($cnae));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(CnaeVO $cnae){
		unset($cnae->CNAE);

		try {
			$where = $this->quote("CD_CNAE=?", $cnae->CD_CNAE);
			$this->tbl->update(get_object_vars($cnae), $where);
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function excluir($CD){
		$row = $this->tbl->find($CD)->current();
		if($row){
			$row->delete();
		}else{
			throw new Zend_Exception("Objeto Inexistente!");
		}
	}

	function quote($texto, $valor){
		return Zend_Db_Table::getDefaultAdapter()->quoteInto($texto, $valor);
	}

	function getTotal(){
		return $this->totalCount;
	}

}
?>