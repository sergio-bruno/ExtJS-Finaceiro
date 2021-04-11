<?php
class EnderecoPessoaPjService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $enderecoService;
	protected $pessoaPjService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new EnderecoPessoaPjTable();

		$this->enderecoService = new EnderecoService();
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
		$vo = new EnderecoPessoaPjVO();
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
		$pessoaPj = $row->findParentRow("PessoaPjTable");
		if($pessoaPj != null){
			$vo->PESSOA_PJ = $this->pessoaPjService->getVOByRow($pessoaPj);
		}else{
			$vo->PESSOA_PJ = $this->pessoaPjService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new EnderecoPessoaPjVO();
			$vo->ENDERECO = $this->enderecoService->getVONULL();
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
		$id = $db->lastInsertId('"endereco_pessoa_pj"');

		return $id;
	}

	function inserir(EnderecoPessoaPjVO $endereco_pessoa_pj){
		unset($endereco_pessoa_pj->ENDERECO);
		unset($endereco_pessoa_pj->PESSOA_PJ);

		try {
			$this->tbl->insert(get_object_vars($endereco_pessoa_pj));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(EnderecoPessoaPjVO $endereco_pessoa_pj){
		unset($endereco_pessoa_pj->ENDERECO);
		unset($endereco_pessoa_pj->PESSOA_PJ);

		try {
			$where = $this->quote("CD_ENDERECO=?", $endereco_pessoa_pj->CD_ENDERECO);
			$this->tbl->update(get_object_vars($endereco_pessoa_pj), $where);
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

	function listarEnderecosPessoa($cdPessoaPj){
		$db = Zend_Db_Table::getDefaultAdapter();
		$query = "SELECT CD_ENDERECO FROM endereco_pessoa_pj WHERE CD_PESSOA_PJ = ".$cdPessoaPj;
		$rows = $db->fetchAll($query);
		return $rows;
	}

	function listarEnderecosCompletoPessoaPj($cdPessoaPj){
		$db = Zend_Db_Table::getDefaultAdapter();
		$query = "SELECT ep.CD_ENDERECO, e.DS_LOGRADOURO, e.NR_ENDERECO, e.DS_COMPLEMENTO,
			e.NM_BAIRRO, e.CD_CIDADE, c.DS_CIDADE, c.CD_UF, e.NR_CEP, 
			e.CD_TIPO_LOGRADOURO, t.DS_TIPO_LOGRADOURO, t.DS_TIPO_LOGRADOURO_ABREV,
			e.CD_TIPO_ENDERECO, te.DS_TIPO_ENDERECO  
			FROM endereco_pessoa_pj ep 
			JOIN endereco e ON e.CD_ENDERECO = ep.CD_ENDERECO
			LEFT OUTER JOIN cidade c ON c.CD_CIDADE = e.CD_CIDADE
			LEFT OUTER JOIN tipo_logradouro t ON t.CD_TIPO_LOGRADOURO = e.CD_TIPO_LOGRADOURO
			LEFT OUTER JOIN tipo_endereco te ON te.CD_TIPO_ENDERECO = e.CD_TIPO_ENDERECO
			WHERE e.SN_ATIVO = 'S' AND ep.CD_PESSOA_PJ = ".$cdPessoaPj;
		$rows = $db->fetchAll($query);
		return $rows;
	}
	
}
?>