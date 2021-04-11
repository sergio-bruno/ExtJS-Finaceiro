<?php
class PessoaPjClienteService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $pessoaPjService;
	protected $statusClienteService;
	protected $classificacaoService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new PessoaPjClienteTable();

		$this->pessoaPjService = new PessoaPjService();
		$this->statusClienteService = new StatusClienteService();
		$this->classificacaoService = new ClassificacaoService();
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
		$vo = new PessoaPjClienteVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$pessoaPj = $row->findParentRow("PessoaPjTable");
		if($pessoaPj != null){
			$vo->PESSOA_PJ = $this->pessoaPjService->getVOByRow($pessoaPj);
		}else{
			$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
		}
		$statusCliente = $row->findParentRow("StatusClienteTable");
		if($statusCliente != null){
			$vo->STATUS_CLIENTE = $this->statusClienteService->getVOByRow($statusCliente);
		}else{
			$vo->STATUS_CLIENTE = $this->statusClienteService->getVONULL();
		}
		$classificacao = $row->findParentRow("ClassificacaoTable");
		if($classificacao != null){
			$vo->CLASSIFICACAO = $this->classificacaoService->getVOByRow($classificacao);
		}else{
			$vo->CLASSIFICACAO = $this->classificacaoService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new PessoaPjClienteVO();
		$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
		$vo->STATUS_CLIENTE = $this->statusClienteService->getVONULL();
		$vo->CLASSIFICACAO = $this->classificacaoService->getVONULL();
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
		$id = $db->lastInsertId('"pessoa_pj_cliente"');

		return $id;
	}

	function inserir(PessoaPjClienteVO $pessoa_pj_cliente){
		unset($pessoa_pj_cliente->PESSOA_PJ);
		unset($pessoa_pj_cliente->STATUS_CLIENTE);
		unset($pessoa_pj_cliente->CLASSIFICACAO);

		try {
			$this->tbl->insert(get_object_vars($pessoa_pj_cliente));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(PessoaPjClienteVO $pessoa_pj_cliente){
		unset($pessoa_pj_cliente->PESSOA_PJ);
		unset($pessoa_pj_cliente->STATUS_CLIENTE);
		unset($pessoa_pj_cliente->CLASSIFICACAO);

		try {
			$where = $this->quote("CD_PESSOA_PJ=?", $pessoa_pj_cliente->CD_PESSOA_PJ);
			$this->tbl->update(get_object_vars($pessoa_pj_cliente), $where);
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