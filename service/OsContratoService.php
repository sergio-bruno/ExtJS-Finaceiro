<?php
class OsContratoService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $osService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new OsContratoTable();

		$this->osService = new OsService();
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
		$vo = new OsContratoVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$os = $row->findParentRow("OsTable");
		if($os != null){
			$vo->OS = $this->osService->getVOByRow($os);
		}else{
			$vo->OS = $this->osService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new OsContratoVO();
			$vo->OS = $this->osService->getVONULL();
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
		$id = $db->lastInsertId('"os_contrato"');

		return $id;
	}

	function inserir(OsContratoVO $os_contrato){
		unset($os_contrato->OS);

		try {
			$this->tbl->insert(get_object_vars($os_contrato));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(OsContratoVO $os_contrato){
		unset($os_contrato->OS);

		try {
			$where = $this->quote("CD_OS_CONTRATO=?", $os_contrato->CD_OS_CONTRATO);
			$where = $where.$this->quote(" AND NR_OS=?", $os_contrato->NR_OS);
			$this->tbl->update(get_object_vars($os_contrato), $where);
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