<?php
class OsService extends GenericService{

	private $tbl;
	private $count;
	private $init;
	private $totalCount;
	protected $empresaService;
	protected $statusFichaService;
	protected $tipoServicoService;
	protected $areaAtuacaoService;

	public function __construct(){
		$this->count = 100;
		$this->init = 0;
		$this->totalCount = 0;
		$this->tbl = new OsTable();

		$this->empresaService = new EmpresaService();
		$this->statusFichaService = new StatusFichaService();
		$this->tipoServicoService = new TipoServicoService();
		$this->areaAtuacaoService = new AreaAtuacaoService();
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
		$vo = new OsVO();
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
		$statusFicha = $row->findParentRow("StatusFichaTable");
		if($statusFicha != null){
			$vo->STATUS_FICHA = $this->statusFichaService->getVOByRow($statusFicha);
		}else{
			$vo->STATUS_FICHA = $this->statusFichaService->getVONULL();
		}
		$tipoServico = $row->findParentRow("TipoServicoTable");
		if($tipoServico != null){
			$vo->TIPO_SERVICO = $this->tipoServicoService->getVOByRow($tipoServico);
		}else{
			$vo->TIPO_SERVICO = $this->tipoServicoService->getVONULL();
		}
		$areaAtuacao = $row->findParentRow("AreaAtuacaoTable");
		if($areaAtuacao != null){
			$vo->AREA_ATUACAO = $this->areaAtuacaoService->getVOByRow($areaAtuacao);
		}else{
			$vo->AREA_ATUACAO = $this->areaAtuacaoService->getVONULL();
		}
		return $vo;
	}

	function getVONULL(){
		$vo = new OsVO();
			$vo->EMPRESA = $this->empresaService->getVONULL();
			$vo->STATUS_FICHA = $this->statusFichaService->getVONULL();
			$vo->TIPO_SERVICO = $this->tipoServicoService->getVONULL();
			$vo->AREA_ATUACAO = $this->areaAtuacaoService->getVONULL();
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
		$id = $db->lastInsertId('"os"');

		return $id;
	}

	function inserir(OsVO $os){
		unset($os->EMPRESA);
		unset($os->STATUS_FICHA);
		unset($os->TIPO_SERVICO);
		unset($os->AREA_ATUACAO);

		try {
			$this->tbl->insert(get_object_vars($os));
		} catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage());
		}
	}

	function alterar(OsVO $os){
		unset($os->EMPRESA);
		unset($os->STATUS_FICHA);
		unset($os->TIPO_SERVICO);
		unset($os->AREA_ATUACAO);

		try {
			$where = $this->quote("CD_OS=?", $os->CD_OS);
			$this->tbl->update(get_object_vars($os), $where);
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