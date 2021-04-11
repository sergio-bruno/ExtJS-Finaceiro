<?php
class CnaeTable extends Zend_Db_Table_Abstract{
	protected $_name = "cnae";
	protected $_primary = array("CD_CNAE");
	protected $_dependentTables = array("CnaeTable", "PessoaPjTable");
	protected $_referenceMap = array(
		"CnaeTable" => array(
			"columns"=>"CD_CNAE_PREDEC",
			"refTableClass"=>"CnaeTable",
			"refColumns"=>"CD_CNAE",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>