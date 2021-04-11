<?php
class SoftwareFuncionalidadeTable extends Zend_Db_Table_Abstract{
	protected $_name = "software_funcionalidade";
	protected $_primary = array("CD_SOFTWARE_FUNCIONALIDADE");
	protected $_referenceMap = array(
		"SoftwareTable" => array(
			"columns"=>"CD_SOFTWARE",
			"refTableClass"=>"SoftwareTable",
			"refColumns"=>"CD_SOFTWARE",
			"onDelete"=>self::RESTRICT
		),

		"FuncionalidadeTable" => array(
			"columns"=>"CD_FUNCIONALIDADE",
			"refTableClass"=>"FuncionalidadeTable",
			"refColumns"=>"CD_FUNCIONALIDADE",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>