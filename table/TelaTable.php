<?php
class TelaTable extends Zend_Db_Table_Abstract{
	protected $_name = "tela";
	protected $_primary = array("CD_TELA");
	protected $_dependentTables = array("MenuTable", "ParametroTelaTable", "UsuarioTelaTable");
}
?>