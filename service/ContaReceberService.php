<?php
class ContaReceberService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $empresaService;
	protected $pessoaService;
	protected $usuarioService;
	protected $planoContaService;
	protected $pessoaPjService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new ContaReceberTable();

		$this->empresaService = new EmpresaService();
		$this->pessoaService = new PessoaService();
		$this->usuarioService = new UsuarioService();
		$this->usuarioService = new UsuarioService();
		$this->planoContaService = new PlanoContaService();
		$this->pessoaPjService = new PessoaPjService();
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
		$vo = new ContaReceberVO();
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
		$pessoa = $row->findParentRow("PessoaTable");
		if($pessoa != null){
			$vo->PESSOA = $this->pessoaService->getVOByRow($pessoa);
		}else{
			$vo->PESSOA = $this->pessoaService->getVONULL();
		}
		$usuario = $row->findParentRow("UsuarioTable");
		if($usuario != null){
			$vo->USUARIO_CADASTRO = $this->usuarioService->getVOByRow($usuario);
		}else{
			$vo->USUARIO_CADASTRO = $this->usuarioService->getVONULL();
		}
		$usuario = $row->findParentRow("UsuarioTable");
		if($usuario != null){
			$vo->USUARIO_ALTERACAO = $this->usuarioService->getVOByRow($usuario);
		}else{
			$vo->USUARIO_ALTERACAO = $this->usuarioService->getVONULL();
		}
		$planoConta = $row->findParentRow("PlanoContaTable");
		if($planoConta != null){
			$vo->PLANO_CONTA = $this->planoContaService->getVOByRow($planoConta);
		}else{
			$vo->PLANO_CONTA = $this->planoContaService->getVONULL();
		}
		$pessoaPj = $row->findParentRow("PessoaPjTable");
		if($pessoaPj != null){
			$vo->PESSOA_PJ = $this->pessoaPjService->getVOByRow($pessoaPj);
		}else{
			$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new ContaReceberVO();
			$vo->EMPRESA = $this->empresaService->getVONULL();
			$vo->PESSOA = $this->pessoaService->getVONULL();
			$vo->USUARIO_CADASTRO = $this->usuarioService->getVONULL();
			$vo->USUARIO_ALTERACAO = $this->usuarioService->getVONULL();
			$vo->PLANO_CONTA = $this->planoContaService->getVONULL();
			$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
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
		$id = $db->lastInsertId('"conta_receber"');

		return $id;
	}

	function inserir(ContaReceberVO $conta_receber){
		unset($conta_receber->EMPRESA);
		unset($conta_receber->PESSOA);
		unset($conta_receber->USUARIO_CADASTRO);
		unset($conta_receber->USUARIO_ALTERACAO);
		unset($conta_receber->PLANO_CONTA);
		unset($conta_receber->PESSOA_PJ);

		try {
			$this->tbl->insert(get_object_vars($conta_receber));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(ContaReceberVO $conta_receber){
		unset($conta_receber->EMPRESA);
		unset($conta_receber->PESSOA);
		unset($conta_receber->USUARIO_CADASTRO);
		unset($conta_receber->USUARIO_ALTERACAO);
		unset($conta_receber->PLANO_CONTA);
		unset($conta_receber->PESSOA_PJ);

		try {
			$where = $this->quote("CD_CONTA_RECEBER=?", $conta_receber->CD_CONTA_RECEBER);
			$this->tbl->update(get_object_vars($conta_receber), $where);
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