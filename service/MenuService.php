<?php
class MenuService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $grupoMenuService;
	//protected $menuService;
	protected $telaService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new MenuTable();

		$this->grupoMenuService = new GrupoMenuService();
		//$this->menuService = new MenuService();
		$this->telaService = new TelaService();
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
		$vo = new MenuVO();
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
		/*$menu = $row->findParentRow("MenuTable");
		if($menu != null){
			$vo->MENU_PAI = $this->menuService->getVOByRow($menu);
		}else{
			$vo->MENU_PAI = $this->menuService->getVONULL();
		}*/
		$tela = $row->findParentRow("TelaTable");
		if($tela != null){
			$vo->TELA = $this->telaService->getVOByRow($tela);
		}else{
			$vo->TELA = $this->telaService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new MenuVO();
			$vo->GRUPO_MENU = $this->grupoMenuService->getVONULL();
			$vo->MENU_PAI = $this->menuService->getVONULL();
			$vo->TELA = $this->telaService->getVONULL();
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
		$id = $db->lastInsertId('"menu"');

		return $id;
	}

	function inserir(MenuVO $menu){
		unset($menu->GRUPO_MENU);
		unset($menu->MENU_PAI);
		unset($menu->TELA);

		try {
			$this->tbl->insert(get_object_vars($menu));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(MenuVO $menu){
		unset($menu->GRUPO_MENU);
		unset($menu->MENU_PAI);
		unset($menu->TELA);

		try {
			$where = $this->quote("CD_MENU=?", $menu->CD_MENU);
			$this->tbl->update(get_object_vars($menu), $where);
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