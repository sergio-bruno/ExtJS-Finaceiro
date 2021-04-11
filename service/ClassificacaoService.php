<?php
class ClassificacaoService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $empresaService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new ClassificacaoTable();

		$this->empresaService = new EmpresaService();
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
		$vo = new ClassificacaoVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$empresa = $row->findParentRow("EmpresaTable");
		if($empresa != null){
			$vo->EMPRESA = $this->empresaService->getVOByRow($empresa);
		}else{
			$vo->EMPRESA = $this->empresaService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new ClassificacaoVO();
			$vo->EMPRESA = $this->empresaService->getVONULL();
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
		$id = $db->lastInsertId('"classificacao"');

		return $id;
	}

	function inserir(ClassificacaoVO $classificacao){
		unset($classificacao->EMPRESA);

		try {
			$this->tbl->insert(get_object_vars($classificacao));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(ClassificacaoVO $classificacao){
		unset($classificacao->EMPRESA);

		try {
			$where = $this->quote("CD_CLASSIFICACAO=?", $classificacao->CD_CLASSIFICACAO);
			$this->tbl->update(get_object_vars($classificacao), $where);
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