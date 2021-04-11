<?php
class PessoaPjFabricanteService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $pessoaPjService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new PessoaPjFabricanteTable();

		$this->pessoaPjService = new PessoaPjService();
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
		$vo = new PessoaPjFabricanteVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$pessoaPj = $row->findParentRow("PessoaPjTable");
		if($pessoaPj != null){
			$vo->PESSOA_PJ = $this->pessoaPjService->getVOByRow($pessoaPj);
		}else{
			$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new PessoaPjFabricanteVO();
			$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
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
		$id = $db->lastInsertId('"pessoa_pj_fabricante"');

		return $id;
	}

	function inserir(PessoaPjFabricanteVO $pessoa_pj_fabricante){
		unset($pessoa_pj_fabricante->PESSOA_PJ);

		try {
			$this->tbl->insert(get_object_vars($pessoa_pj_fabricante));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(PessoaPjFabricanteVO $pessoa_pj_fabricante){
		unset($pessoa_pj_fabricante->PESSOA_PJ);

		try {
			$where = $this->quote("CD_PESSOA_PJ=?", $pessoa_pj_fabricante->CD_PESSOA_PJ);
			$this->tbl->update(get_object_vars($pessoa_pj_fabricante), $where);
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