<?php
class GrupoMenuUsuarioTable extends Zend_Db_Table_Abstract{
	protected $_name = "grupo_menu_usuario";
	protected $_primary = array("CD_GRUPO_MENU","CD_USUARIO");
	protected $_referenceMap = array(
		"GrupoMenuTable" => array(
			"columns"=>"CD_GRUPO_MENU",
			"refTableClass"=>"GrupoMenuTable",
			"refColumns"=>"CD_GRUPO_MENU",
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