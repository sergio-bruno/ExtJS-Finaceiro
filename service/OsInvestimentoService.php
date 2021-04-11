<?php
class OsInvestimentoService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $osService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new OsInvestimentoTable();

		$this->osService = new OsService();
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
		$vo = new OsInvestimentoVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$os = $row->findParentRow("OsTable");
		if($os != null){
			$vo->OS = $this->osService->getVOByRow($os);
		}else{
			$vo->OS = $this->osService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new OsInvestimentoVO();
			$vo->OS = $this->osService->getVONULL();
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
		$id = $db->lastInsertId('"os_investimento"');

		return $id;
	}

	function inserir(OsInvestimentoVO $os_investimento){
		unset($os_investimento->OS);

		try {
			$this->tbl->insert(get_object_vars($os_investimento));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(OsInvestimentoVO $os_investimento){
		unset($os_investimento->OS);

		try {
			$where = $this->quote("CD_OS_INVESTIMENTO=?", $os_investimento->CD_OS_INVESTIMENTO);
			$this->tbl->update(get_object_vars($os_investimento), $where);
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