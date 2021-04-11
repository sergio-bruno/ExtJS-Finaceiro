<?php
class MenuUsuarioTable extends Zend_Db_Table_Abstract{
	protected $_name = "menu_usuario";
	protected $_primary = array("CD_MENU","CD_USUARIO");
	protected $_referenceMap = array(
		"MenuTable" => array(
			"columns"=>"CD_MENU",
			"refTableClass"=>"MenuTable",
			"refColumns"=>"CD_MENU",
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