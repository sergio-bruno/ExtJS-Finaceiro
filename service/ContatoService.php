<?php
class ContatoService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $tipoContatoService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new ContatoTable();

		$this->tipoContatoService = new TipoContatoService();
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
		$vo = new ContatoVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}

		$tipoContato = $row->findParentRow("TipoContatoTable");
		if($tipoContato != null){
			$vo->TIPO_CONTATO = $this->tipoContatoService->getVOByRow($tipoContato);
		}else{
			$vo->TIPO_CONTATO = $this->tipoContatoService->getVONULL();
		}
		
		return $vo;
	}

	function getVONULL(){
		$vo = new ContatoVO();
		$vo->TIPO_CONTATO = $this->tipoContatoService->getVONULL();
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
		$id = $db->lastInsertId('"contato"');

		return $id;
	}

	function inserir(ContatoVO $contato){
		unset($contato->TIPO_CONTATO);

		try {
			$this->tbl->insert(get_object_vars($contato));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(ContatoVO $contato){
		unset($contato->TIPO_CONTATO);

		try {
			$where = $this->quote("CD_CONTATO=?", $contato->CD_CONTATO);
			$this->tbl->update(get_object_vars($contato), $where);
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