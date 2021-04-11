<?php
class UsuarioTable extends Zend_Db_Table_Abstract{
	protected $_name = "usuario";
	protected $_primary = array("CD_USUARIO");
	protected $_dependentTables = array("PerfilUsuarioTable", "PessoaTable", "PessoaPjTable");
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