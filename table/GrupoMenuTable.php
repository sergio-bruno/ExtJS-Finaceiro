<?php
class GrupoMenuTable extends Zend_Db_Table_Abstract{
	protected $_name = "grupo_menu";
	protected $_primary = array("CD_GRUPO_MENU");
	protected $_dependentTables = array("GrupoMenuUsuarioTable", "MenuTable");
}
?>