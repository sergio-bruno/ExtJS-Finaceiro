<?php
class RedeSocialPessoaService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $redeSocialService;
	protected $pessoaService;
	protected $empresaService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new RedeSocialPessoaTable();

		$this->redeSocialService = new RedeSocialService();
		$this->pessoaService = new PessoaService();
		$this->empresaService = new EmpresaService();
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
		$vo = new RedeSocialPessoaVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$redeSocial = $row->findParentRow("RedeSocialTable");
		if($redeSocial != null){
			$vo->REDE_SOCIAL = $this->redeSocialService->getVOByRow($redeSocial);
		}else{
			$vo->REDE_SOCIAL = $this->redeSocialService->getVONULL();
		}
		$pessoa = $row->findParentRow("PessoaTable");
		if($pessoa != null){
			$vo->PESSOA = $this->pessoaService->getVOByRow($pessoa);
		}else{
			$vo->PESSOA = $this->pessoaService->getVONULL();
		}
		$empresa = $row->findParentRow("EmpresaTable");
		if($empresa != null){
			$vo->EMPRESA = $this->empresaService->getVOByRow($empresa);
		}else{
			$vo->EMPRESA = $this->empresaService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new RedeSocialPessoaVO();
			$vo->REDE_SOCIAL = $this->redeSocialService->getVONULL();
			$vo->PESSOA = $this->pessoaService->getVONULL();
			$vo->EMPRESA = $this->empresaService->getVONULL();
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
		$id = $db->lastInsertId('"rede_social_pessoa"');

		return $id;
	}

	function inserir(RedeSocialPessoaVO $rede_social_pessoa){
		unset($rede_social_pessoa->REDE_SOCIAL);
		unset($rede_social_pessoa->PESSOA);
		unset($rede_social_pessoa->EMPRESA);

		try {
			$this->tbl->insert(get_object_vars($rede_social_pessoa));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(RedeSocialPessoaVO $rede_social_pessoa){
		unset($rede_social_pessoa->REDE_SOCIAL);
		unset($rede_social_pessoa->PESSOA);
		unset($rede_social_pessoa->EMPRESA);

		try {
			$where = $this->quote("CD_REDE_SOCIAL_PESSOA=?", $rede_social_pessoa->CD_REDE_SOCIAL_PESSOA);
			$this->tbl->update(get_object_vars($rede_social_pessoa), $where);
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