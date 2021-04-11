<?php
class OsLicitacaoTable extends Zend_Db_Table_Abstract{
	protected $_name = "os_licitacao";
	protected $_primary = array("CD_OS_LICITACAO");
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