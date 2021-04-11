<?php
class OsAcaoComercialTable extends Zend_Db_Table_Abstract{
	protected $_name = "os_acao_comercial";
	protected $_primary = array("CD_OS_ACAO_COMERCIAL");
	protected $_referenceMap = array(
		"OsTable" => array(
			"columns"=>"NR_OS",
			"refTableClass"=>"OsTable",
			"refColumns"=>"CD_OS",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>