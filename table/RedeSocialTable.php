<?php
class RedeSocialTable extends Zend_Db_Table_Abstract{
	protected $_name = "rede_social";
	protected $_primary = array("CD_REDE_SOCIAL");
	protected $_dependentTables = array("RedeSocialPessoaTable");
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