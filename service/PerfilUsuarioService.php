<?php
class PerfilUsuarioService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $perfilService;
	protected $usuarioService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new PerfilUsuarioTable();

		$this->perfilService = new PerfilService();
		$this->usuarioService = new UsuarioService();
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
		$vo = new PerfilUsuarioVO();
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
		$usuario = $row->findParentRow("UsuarioTable");
		if($usuario != null){
			$vo->USUARIO = $this->usuarioService->getVOByRow($usuario);
		}else{
			$vo->USUARIO = $this->usuarioService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new PerfilUsuarioVO();
			$vo->PERFIL = $this->perfilService->getVONULL();
			$vo->USUARIO = $this->usuarioService->getVONULL();
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
		$id = $db->lastInsertId('"perfil_usuario"');

		return $id;
	}

	function inserir(PerfilUsuarioVO $perfil_usuario){
		unset($perfil_usuario->PERFIL);
		unset($perfil_usuario->USUARIO);

		try {
			$this->tbl->insert(get_object_vars($perfil_usuario));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(PerfilUsuarioVO $perfil_usuario){
		unset($perfil_usuario->PERFIL);
		unset($perfil_usuario->USUARIO);

		try {
			$where = $this->quote("CD_PERFIL=?", $perfil_usuario->CD_PERFIL);
			$where = $where.$this->quote(" AND CD_USUARIO=?", $perfil_usuario->CD_USUARIO);
			$this->tbl->update(get_object_vars($perfil_usuario), $where);
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