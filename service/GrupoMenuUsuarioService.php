<?php
class GrupoMenuUsuarioService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $grupoMenuService;
	protected $usuarioService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new GrupoMenuUsuarioTable();

		$this->grupoMenuService = new GrupoMenuService();
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
		$vo = new GrupoMenuUsuarioVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$grupoMenu = $row->findParentRow("GrupoMenuTable");
		if($grupoMenu != null){
			$vo->GRUPO_MENU = $this->grupoMenuService->getVOByRow($grupoMenu);
		}else{
			$vo->GRUPO_MENU = $this->grupoMenuService->getVONULL();
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
		$vo = new GrupoMenuUsuarioVO();
			$vo->GRUPO_MENU = $this->grupoMenuService->getVONULL();
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
		$id = $db->lastInsertId('"grupo_menu_usuario"');

		return $id;
	}

	function inserir(GrupoMenuUsuarioVO $grupo_menu_usuario){
		unset($grupo_menu_usuario->GRUPO_MENU);
		unset($grupo_menu_usuario->USUARIO);

		try {
			$this->tbl->insert(get_object_vars($grupo_menu_usuario));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(GrupoMenuUsuarioVO $grupo_menu_usuario){
		unset($grupo_menu_usuario->GRUPO_MENU);
		unset($grupo_menu_usuario->USUARIO);

		try {
			$where = $this->quote("CD_GRUPO_MENU=?", $grupo_menu_usuario->CD_GRUPO_MENU);
			$where = $where.$this->quote(" AND CD_USUARIO=?", $grupo_menu_usuario->CD_USUARIO);
			$this->tbl->update(get_object_vars($grupo_menu_usuario), $where);
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