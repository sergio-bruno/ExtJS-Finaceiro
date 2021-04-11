<?php
class OsContratoTable extends Zend_Db_Table_Abstract{
	protected $_name = "os_contrato";
	protected $_primary = array("CD_OS_CONTRATO","NR_OS");
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