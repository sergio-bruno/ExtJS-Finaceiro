<?php
class VisitaService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	//protected $pessoaPjService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new VisitaTable();

		//$this->pessoaPjService = new PessoaPjService();
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
		$vo = new VisitaVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		/*
		$pessoaPj = $row->findParentRow("PessoaPjTable");
		if($pessoaPj != null){
			$vo->PESSOA_PJ = $this->pessoaPjService->getVOByRow($pessoaPj);
		}else{
			$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
		}
		*/
		return $vo;
	}

	function getVONULL(){
		$vo = new VisitaVO();
		# $vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
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
		$id = $db->lastInsertId('"visita"');

		return $id;
	}

	function inserir(VisitaVO $visita){
		# unset($visita->PESSOA_PJ);

		try {
			$this->tbl->insert(get_object_vars($visita));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(VisitaVO $visita){
		# unset($visita->PESSOA_PJ);

		try {
			$where = $this->quote("CD_VISITA=?", $visita->CD_VISITA);
			$this->tbl->update(get_object_vars($visita), $where);
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

	function listarVisitasPessoa($cdPessoaPj){
		$db = Zend_Db_Table::getDefaultAdapter();
		$query = "SELECT CD_VISITA FROM visita WHERE CD_PESSOA_PJ = ".$cdPessoaPj;
		$rows = $db->fetchAll($query);
		return $rows;
	}
	
}
?>