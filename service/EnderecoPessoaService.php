<?php
class EnderecoPessoaService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $enderecoService;
	protected $pessoaService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new EnderecoPessoaTable();

		$this->enderecoService = new EnderecoService();
		$this->pessoaService = new PessoaService();
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
		$vo = new EnderecoPessoaVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		
		$endereco = $row->findParentRow("EnderecoTable");
		if($endereco != null){
			$vo->ENDERECO = $this->enderecoService->getVOByRow($endereco);
		}else{
			$vo->ENDERECO = $this->enderecoService->getVONULL();
		}
		
		$pessoa = $row->findParentRow("PessoaTable");
		if($pessoa != null){
			$vo->PESSOA = $this->pessoaService->getVOByRow($pessoa);
		}else{
			$vo->PESSOA = $this->pessoaService->getVONULL();
		}
		
		return $vo;
	}

	function getVONULL(){
		$vo = new EnderecoPessoaVO();
		$vo->ENDERECO = $this->enderecoService->getVONULL();
		$vo->PESSOA = $this->pessoaService->getVONULL();
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
		$id = $db->lastInsertId('"endereco_pessoa"');

		return $id;
	}

	function inserir(EnderecoPessoaVO $endereco_pessoa){
		unset($endereco_pessoa->ENDERECO);
		unset($endereco_pessoa->PESSOA);

		try {
			$this->tbl->insert(get_object_vars($endereco_pessoa));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(EnderecoPessoaVO $endereco_pessoa){
		unset($endereco_pessoa->ENDERECO);
		unset($endereco_pessoa->PESSOA);

		try {
			$where = $this->quote("CD_ENDERECO=?", $endereco_pessoa->CD_ENDERECO);
			$this->tbl->update(get_object_vars($endereco_pessoa), $where);
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

	function listarEnderecosPessoa($cdPessoa){
		$db = Zend_Db_Table::getDefaultAdapter();
		$query = "SELECT CD_ENDERECO FROM endereco_pessoa WHERE CD_PESSOA = ".$cdPessoa;
		$rows = $db->fetchAll($query);
		return $rows;
	}
	
}
?>