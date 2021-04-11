<?php
class TipoConselhoTable extends Zend_Db_Table_Abstract{
	protected $_name = "tipo_conselho";
	protected $_primary = array("CD_TIPO_CONSELHO");
	protected $_dependentTables = array("ConselhoTable", "ConselhoTable", "EspecialidadeTable");
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