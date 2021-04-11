<?php
class EmpresaSoftwareService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $empresaService;
	protected $softwareService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new EmpresaSoftwareTable();

		$this->empresaService = new EmpresaService();
		$this->softwareService = new SoftwareService();
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
		$vo = new EmpresaSoftwareVO();
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
		$software = $row->findParentRow("SoftwareTable");
		if($software != null){
			$vo->SOFTWARE = $this->softwareService->getVOByRow($software);
		}else{
			$vo->SOFTWARE = $this->softwareService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new EmpresaSoftwareVO();
			$vo->EMPRESA = $this->empresaService->getVONULL();
			$vo->SOFTWARE = $this->softwareService->getVONULL();
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
		$id = $db->lastInsertId('"empresa_software"');

		return $id;
	}

	function inserir(EmpresaSoftwareVO $empresa_software){
		unset($empresa_software->EMPRESA);
		unset($empresa_software->SOFTWARE);

		try {
			$this->tbl->insert(get_object_vars($empresa_software));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(EmpresaSoftwareVO $empresa_software){
		unset($empresa_software->EMPRESA);
		unset($empresa_software->SOFTWARE);

		try {
			$where = $this->quote("CD_EMPRESA_SOFTWARE=?", $empresa_software->CD_EMPRESA_SOFTWARE);
			$this->tbl->update(get_object_vars($empresa_software), $where);
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