<?php
class PessoaService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new PessoaTable();

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
		$vo = new PessoaVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new PessoaVO();
		return $vo;
	}

	function getBySelect($query, $paginacao = true){

		$db = Zend_Db_Table::getDefaultAdapter();
		
		$rows = $db->fetchAll($query);		
		$this->totalCount = $this->getTotalBySelect($query);

		if ($paginacao) {
			$query = $query . " LIMIT ". $this->init .",".$this->count;
			$rows = $db->fetchAll($query);
		}

		return $rows;
	}

	function getTotalBySelect($query){

		$db = Zend_Db_Table::getDefaultAdapter();

		$query = " select count(*) as totalTable from (". $query.") total ";
		$rows = $db->fetchAll($query);		
		

		return $rows[0]['totalTable'];
	}

	function getLastInsertId(){

		$db = Zend_Db_Table::getDefaultAdapter();
		$id = $db->lastInsertId('"pessoa"');

		return $id;
	}

	function inserir(PessoaVO $pessoa){

		try {
			$this->tbl->insert(get_object_vars($pessoa));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(PessoaVO $pessoa){

		try {
			$where = $this->quote("CD_PESSOA=?", $pessoa->CD_PESSOA);
			$this->tbl->update(get_object_vars($pessoa), $where);
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