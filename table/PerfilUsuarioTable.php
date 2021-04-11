<?php
class PerfilUsuarioTable extends Zend_Db_Table_Abstract{
	protected $_name = "perfil_usuario";
	protected $_primary = array("CD_PERFIL","CD_USUARIO");
	protected $_referenceMap = array(
		"PerfilTable" => array(
			"columns"=>"CD_PERFIL",
			"refTableClass"=>"PerfilTable",
			"refColumns"=>"CD_PERFIL",
			"onDelete"=>self::RESTRICT
		),

		"PerfilTable" => array(
			"columns"=>"CD_PERFIL",
			"refTableClass"=>"PerfilTable",
			"refColumns"=>"CD_PERFIL",
			"onDelete"=>self::RESTRICT
		),

		"PerfilTable" => array(
			"columns"=>"CD_PERFIL",
			"refTableClass"=>"PerfilTable",
			"refColumns"=>"CD_PERFIL",
			"onDelete"=>self::RESTRICT
		),

		"PerfilTable" => array(
			"columns"=>"CD_PERFIL",
			"refTableClass"=>"PerfilTable",
			"refColumns"=>"CD_PERFIL",
			"onDelete"=>self::RESTRICT
		),

		"UsuarioTable" => array(
			"columns"=>"CD_USUARIO",
			"refTableClass"=>"UsuarioTable",
			"refColumns"=>"CD_USUARIO",
			"onDelete"=>self::RESTRICT
		),

		"UsuarioTable" => array(
			"columns"=>"CD_USUARIO",
			"refTableClass"=>"UsuarioTable",
			"refColumns"=>"CD_USUARIO",
			"onDelete"=>self::RESTRICT
		),

		"UsuarioTable" => array(
			"columns"=>"CD_USUARIO",
			"refTableClass"=>"UsuarioTable",
			"refColumns"=>"CD_USUARIO",
			"onDelete"=>self::RESTRICT
		),

		"UsuarioTable" => array(
			"columns"=>"CD_USUARIO",
			"refTableClass"=>"UsuarioTable",
			"refColumns"=>"CD_USUARIO",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>