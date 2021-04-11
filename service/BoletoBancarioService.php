<?php
class BoletoBancarioService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $contaReceberService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new BoletoBancarioTable();

		$this->contaReceberService = new ContaReceberService();
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
		$vo = new BoletoBancarioVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$contaReceber = $row->findParentRow("ContaReceberTable");
		if($contaReceber != null){
			$vo->CONTA_RECEBER = $this->contaReceberService->getVOByRow($contaReceber);
		}else{
			$vo->CONTA_RECEBER = $this->contaReceberService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new BoletoBancarioVO();
			$vo->CONTA_RECEBER = $this->contaReceberService->getVONULL();
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
		$id = $db->lastInsertId('"boleto_bancario"');

		return $id;
	}

	function inserir(BoletoBancarioVO $boleto_bancario){
		unset($boleto_bancario->CONTA_RECEBER);

		try {
			$this->tbl->insert(get_object_vars($boleto_bancario));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(BoletoBancarioVO $boleto_bancario){
		unset($boleto_bancario->CONTA_RECEBER);

		try {
			$where = $this->quote("CD_BOLETO_BANCARIO=?", $boleto_bancario->CD_BOLETO_BANCARIO);
			$this->tbl->update(get_object_vars($boleto_bancario), $where);
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