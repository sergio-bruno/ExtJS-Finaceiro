<?php
class StatusClienteTable extends Zend_Db_Table_Abstract{
	protected $_name = "status_cliente";
	protected $_primary = array("CD_STATUS_CLIENTE");
	protected $_dependentTables = array("PessoaPjClienteTable");
	protected $_referenceMap = array(
		"EmpresaTable" => array(
			"columns"=>"CD_EMPRESA",
			"refTableClass"=>"EmpresaTable",
			"refColumns"=>"CD_EMPRESA",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>