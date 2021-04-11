<?php
class EmpresaSoftwareTable extends Zend_Db_Table_Abstract{
	protected $_name = "empresa_software";
	protected $_primary = array("CD_EMPRESA_SOFTWARE");
	protected $_referenceMap = array(
		"EmpresaTable" => array(
			"columns"=>"CD_EMPRESA",
			"refTableClass"=>"EmpresaTable",
			"refColumns"=>"CD_EMPRESA",
			"onDelete"=>self::RESTRICT
		),

		"SoftwareTable" => array(
			"columns"=>"CD_SOFTWARE",
			"refTableClass"=>"SoftwareTable",
			"refColumns"=>"CD_SOFTWARE",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>