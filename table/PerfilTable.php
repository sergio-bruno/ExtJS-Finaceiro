<?php
class PerfilTable extends Zend_Db_Table_Abstract{
	protected $_name = "perfil";
	protected $_primary = array("CD_PERFIL");
	protected $_dependentTables = array("PerfilUsuarioTable", "PerfilFuncionalidadeTable", "PerfilUsuarioTable", "PerfilUsuarioTable", "PerfilUsuarioTable");
}
?>