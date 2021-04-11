<?php
class StatusFichaTable extends Zend_Db_Table_Abstract{
	protected $_name = "status_ficha";
	protected $_primary = array("CD_STATUS_FICHA");
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