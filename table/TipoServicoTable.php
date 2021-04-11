<?php
class TipoServicoTable extends Zend_Db_Table_Abstract{
	protected $_name = "tipo_servico";
	protected $_primary = array("CD_TIPO_SERVICO");
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