<?php
class PerfilFuncionalidadeService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $perfilService;
	protected $funcionalidadeService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new PerfilFuncionalidadeTable();

		$this->perfilService = new PerfilService();
		$this->funcionalidadeService = new FuncionalidadeService();
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
		$vo = new PerfilFuncionalidadeVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$perfil = $row->findParentRow("PerfilTable");
		if($perfil != null){
			$vo->PERFIL = $this->perfilService->getVOByRow($perfil);
		}else{
			$vo->PERFIL = $this->perfilService->getVONULL();
		}
		$funcionalidade = $row->findParentRow("FuncionalidadeTable");
		if($funcionalidade != null){
			$vo->FUNCIONALIDADE = $this->funcionalidadeService->getVOByRow($funcionalidade);
		}else{
			$vo->FUNCIONALIDADE = $this->funcionalidadeService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new PerfilFuncionalidadeVO();
			$vo->PERFIL = $this->perfilService->getVONULL();
			$vo->FUNCIONALIDADE = $this->funcionalidadeService->getVONULL();
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
		$id = $db->lastInsertId('"perfil_funcionalidade"');

		return $id;
	}

	function inserir(PerfilFuncionalidadeVO $perfil_funcionalidade){
		unset($perfil_funcionalidade->PERFIL);
		unset($perfil_funcionalidade->FUNCIONALIDADE);

		try {
			$this->tbl->insert(get_object_vars($perfil_funcionalidade));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(PerfilFuncionalidadeVO $perfil_funcionalidade){
		unset($perfil_funcionalidade->PERFIL);
		unset($perfil_funcionalidade->FUNCIONALIDADE);

		try {
			$where = $this->quote("CD_PERFIL=?", $perfil_funcionalidade->CD_PERFIL);
			$where = $where.$this->quote(" AND CD_FUNCIONALIDADE=?", $perfil_funcionalidade->CD_FUNCIONALIDADE);
			$this->tbl->update(get_object_vars($perfil_funcionalidade), $where);
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function excluir($CD,$CD2){
		$row = $this->tbl->find($CD,$CD2)->current();
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