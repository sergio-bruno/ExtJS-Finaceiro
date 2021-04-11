<?php
class OsTable extends Zend_Db_Table_Abstract{
	protected $_name = "os";
	protected $_primary = array("CD_OS");
	protected $_dependentTables = array("OsAcaoComercialTable", "OsInvestimentoTable", "OsLicitacaoTable", "OsVisitaTable");
	protected $_referenceMap = array(
		"EmpresaTable" => array(
			"columns"=>"CD_EMPRESA",
			"refTableClass"=>"EmpresaTable",
			"refColumns"=>"CD_EMPRESA",
			"onDelete"=>self::RESTRICT
		),

		"StatusFichaTable" => array(
			"columns"=>"CD_STATUS_FICHA",
			"refTableClass"=>"StatusFichaTable",
			"refColumns"=>"CD_STATUS_FICHA",
			"onDelete"=>self::RESTRICT
		),

		"TipoServicoTable" => array(
			"columns"=>"CD_TIPO_SERVICO",
			"refTableClass"=>"TipoServicoTable",
			"refColumns"=>"CD_TIPO_SERVICO",
			"onDelete"=>self::RESTRICT
		),

		"AreaAtuacaoTable" => array(
			"columns"=>"CD_AREA_ATUACAO",
			"refTableClass"=>"AreaAtuacaoTable",
			"refColumns"=>"CD_AREA_ATUACAO",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>