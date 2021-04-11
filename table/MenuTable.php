<?php
class MenuTable extends Zend_Db_Table_Abstract{
	protected $_name = "menu";
	protected $_primary = array("CD_MENU");
	protected $_dependentTables = array("MenuTable", "MenuUsuarioTable", "ParametroTelaTable");
	protected $_referenceMap = array(
		"GrupoMenuTable" => array(
			"columns"=>"CD_GRUPO_MENU",
			"refTableClass"=>"GrupoMenuTable",
			"refColumns"=>"CD_GRUPO_MENU",
			"onDelete"=>self::RESTRICT
		),

		"MenuTable" => array(
			"columns"=>"CD_MENU_PAI",
			"refTableClass"=>"MenuTable",
			"refColumns"=>"CD_MENU",
			"onDelete"=>self::RESTRICT
		),

		"TelaTable" => array(
			"columns"=>"CD_TELA",
			"refTableClass"=>"TelaTable",
			"refColumns"=>"CD_TELA",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>