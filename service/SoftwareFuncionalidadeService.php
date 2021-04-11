<?php
class SoftwareFuncionalidadeService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $softwareService;
	protected $funcionalidadeService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new SoftwareFuncionalidadeTable();

		$this->softwareService = new SoftwareService();
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
		$vo = new SoftwareFuncionalidadeVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$software = $row->findParentRow("SoftwareTable");
		if($software != null){
			$vo->SOFTWARE = $this->softwareService->getVOByRow($software);
		}else{
			$vo->SOFTWARE = $this->softwareService->getVONULL();
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
		$vo = new SoftwareFuncionalidadeVO();
			$vo->SOFTWARE = $this->softwareService->getVONULL();
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
		$id = $db->lastInsertId('"software_funcionalidade"');

		return $id;
	}

	function inserir(SoftwareFuncionalidadeVO $software_funcionalidade){
		unset($software_funcionalidade->SOFTWARE);
		unset($software_funcionalidade->FUNCIONALIDADE);

		try {
			$this->tbl->insert(get_object_vars($software_funcionalidade));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(SoftwareFuncionalidadeVO $software_funcionalidade){
		unset($software_funcionalidade->SOFTWARE);
		unset($software_funcionalidade->FUNCIONALIDADE);

		try {
			$where = $this->quote("CD_SOFTWARE_FUNCIONALIDADE=?", $software_funcionalidade->CD_SOFTWARE_FUNCIONALIDADE);
			$this->tbl->update(get_object_vars($software_funcionalidade), $where);
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