<?php
class PerfilFuncionalidadeTable extends Zend_Db_Table_Abstract{
	protected $_name = "perfil_funcionalidade";
	protected $_primary = array("CD_PERFIL","CD_FUNCIONALIDADE");
	protected $_referenceMap = array(
		"PerfilTable" => array(
			"columns"=>"CD_PERFIL",
			"refTableClass"=>"PerfilTable",
			"refColumns"=>"CD_PERFIL",
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