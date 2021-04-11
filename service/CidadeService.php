<?php
class CidadeService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new CidadeTable();

		$this->ufService = new UfService();
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
		$vo = new CidadeVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		
		$uf = $row->findParentRow("UfTable");
		if($uf != null){
			$vo->UF = $this->ufService->getVOByRow($uf);
		}else{
			$vo->UF = $this->ufService->getVONULL();
		}
		
		return $vo;
	}

	function getVONULL(){
		$vo = new CidadeVO();
		$vo->UF = $this->ufService->getVONULL();
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
		$id = $db->lastInsertId('"cidade"');

		return $id;
	}

	function inserir(CidadeVO $cidade){
		unset($cidade->UF);
		try {
			$this->tbl->insert(get_object_vars($cidade));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(CidadeVO $cidade){
		unset($cidade->UF);
		try {
			$where = $this->quote("CD_CIDADE=?", $cidade->CD_CIDADE);
			$this->tbl->update(get_object_vars($cidade), $where);
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