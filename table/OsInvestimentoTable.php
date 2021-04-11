<?php
class OsInvestimentoTable extends Zend_Db_Table_Abstract{
	protected $_name = "os_investimento";
	protected $_primary = array("CD_OS_INVESTIMENTO");
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