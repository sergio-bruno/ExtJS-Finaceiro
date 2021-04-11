<?php
class EnderecoService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $cidadeService;
	protected $tipoLogradouroService;
	protected $tipoEnderecoService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new EnderecoTable();

		$this->cidadeService = new CidadeService();
		$this->tipoLogradouroService = new TipoLogradouroService();
		$this->tipoEnderecoService = new TipoEnderecoService();
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
		$vo = new EnderecoVO();
		foreach($vo as $key => $value){
			if($row->__isset($key))
				$vo->$key = $row->$key;
		}

		$cidade = $row->findParentRow("CidadeTable");
		if($cidade != null){
			$vo->CIDADE = $this->cidadeService->getVOByRow($cidade);
		}else{
			$vo->CIDADE = $this->cidadeService->getVONULL();
		}

		$tipoLogradouro = $row->findParentRow("TipoLogradouroTable");
		if($tipoLogradouro != null){
			$vo->TIPO_LOGRADOURO = $this->tipoLogradouroService->getVOByRow($tipoLogradouro);
		}else{
			$vo->TIPO_LOGRADOURO = $this->tipoLogradouroService->getVONULL();
		}

		$tipoEndereco = $row->findParentRow("TipoEnderecoTable");
		if($tipoEndereco != null){
			$vo->TIPO_ENDERECO = $this->tipoEnderecoService->getVOByRow($tipoEndereco);
		}else{
			$vo->TIPO_ENDERECO = $this->tipoEnderecoService->getVONULL();
		}
		
		return $vo;
	}

	function getVONULL(){
		$vo = new EnderecoVO();
		$vo->CIDADE = $this->cidadeService->getVONULL();
		$vo->TIPO_LOGRADOURO = $this->tipoLogradouroService->getVONULL();
		$vo->TIPO_ENDERECO = $this->tipoEnderecoService->getVONULL();
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
		$id = $db->lastInsertId('"endereco"');

		return $id;
	}

	function inserir(EnderecoVO $endereco){
		unset($endereco->CIDADE);
		unset($endereco->TIPO_LOGRADOURO);
		unset($endereco->TIPO_ENDERECO);

		try {
			$this->tbl->insert(get_object_vars($endereco));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(EnderecoVO $endereco){
		unset($endereco->CIDADE);
		unset($endereco->TIPO_LOGRADOURO);
		unset($endereco->TIPO_ENDERECO);

		try {
			$where = $this->quote("CD_ENDERECO=?", $endereco->CD_ENDERECO);
			$this->tbl->update(get_object_vars($endereco), $where);
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