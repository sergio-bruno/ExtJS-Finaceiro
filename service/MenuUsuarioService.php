<?php
class MenuUsuarioService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $menuService;
	protected $usuarioService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new MenuUsuarioTable();

		$this->menuService = new MenuService();
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
		$vo = new MenuUsuarioVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$menu = $row->findParentRow("MenuTable");
		if($menu != null){
			$vo->MENU = $this->menuService->getVOByRow($menu);
		}else{
			$vo->MENU = $this->menuService->getVONULL();
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
		$vo = new MenuUsuarioVO();
			$vo->MENU = $this->menuService->getVONULL();
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
		$id = $db->lastInsertId('"menu_usuario"');

		return $id;
	}

	function inserir(MenuUsuarioVO $menu_usuario){
		unset($menu_usuario->MENU);
		unset($menu_usuario->USUARIO);

		try {
			$this->tbl->insert(get_object_vars($menu_usuario));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(MenuUsuarioVO $menu_usuario){
		unset($menu_usuario->MENU);
		unset($menu_usuario->USUARIO);

		try {
			$where = $this->quote("CD_MENU=?", $menu_usuario->CD_MENU);
			$where = $where.$this->quote(" AND CD_USUARIO=?", $menu_usuario->CD_USUARIO);
			$this->tbl->update(get_object_vars($menu_usuario), $where);
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