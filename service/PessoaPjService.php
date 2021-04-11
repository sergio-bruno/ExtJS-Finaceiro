<?php
class PessoaPjService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $usuarioService;
	protected $empresaService;
	# protected $cnaeService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new PessoaPjTable();

		$this->usuarioService = new UsuarioService();
		$this->empresaService = new EmpresaService();
		//$this->cnaeService = new CnaeService();
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
		$vo = new PessoaPjVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}
		$usuario = $row->findParentRow("UsuarioTable");
		if($usuario != null){
			$vo->USUARIO_CADASTRO = $this->usuarioService->getVOByRow($usuario);
		}else{
			$vo->USUARIO_CADASTRO = $this->usuarioService->getVONULL();
		}
		$empresa = $row->findParentRow("EmpresaTable");
		if($empresa != null){
			$vo->EMPRESA = $this->empresaService->getVOByRow($empresa);
		}else{
			$vo->EMPRESA = $this->empresaService->getVONULL();
		}
		
		/*
		$cnae = $row->findParentRow("CnaeTable");
		if($cnae != null){
			$vo->CNAE = $this->cnaeService->getVOByRow($cnae);
		}else{
			$vo->CNAE = $this->cnaeService->getVONULL();
		}
		*/
		
		return $vo;
	}

	function getVONULL(){
		$vo = new PessoaPjVO();
		$vo->USUARIO_CADASTRO = $this->usuarioService->getVONULL();
		$vo->EMPRESA = $this->empresaService->getVONULL();
		//$vo->CNAE = $this->cnaeService->getVONULL();
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
		$id = $db->lastInsertId('"pessoa_pj"');

		return $id;
	}

	function inserir(PessoaPjVO $pessoa_pj){
		unset($pessoa_pj->USUARIO_CADASTRO);
		unset($pessoa_pj->EMPRESA);
		//unset($pessoa_pj->CNAE);

		try {
			$this->tbl->insert(get_object_vars($pessoa_pj));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(PessoaPjVO $pessoa_pj){
		unset($pessoa_pj->USUARIO_CADASTRO);
		unset($pessoa_pj->EMPRESA);
		//unset($pessoa_pj->CNAE);

		try {
			$where = $this->quote("CD_PESSOA_PJ=?", $pessoa_pj->CD_PESSOA_PJ);
			$this->tbl->update(get_object_vars($pessoa_pj), $where);
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

	function inativarPessoaPj($cdPessoaPj){
		$db = Zend_Db_Table::getDefaultAdapter();
		$query = "UPDATE pessoa_pj SET SN_ATIVO='N' WHERE CD_PESSOA_PJ = ".$cdPessoaPj;
		$db->fetchAll($query);
	}
	
}
?>