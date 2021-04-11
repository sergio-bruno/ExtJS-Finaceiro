<?php
class CargoTable extends Zend_Db_Table_Abstract{
	protected $_name = "cargo";
	protected $_primary = array("CD_CARGO");
	protected $_dependentTables = array("ContatoTable");
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