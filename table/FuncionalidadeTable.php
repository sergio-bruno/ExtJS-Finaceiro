<?php
class FuncionalidadeTable extends Zend_Db_Table_Abstract{
	protected $_name = "funcionalidade";
	protected $_primary = array("CD_FUNCIONALIDADE");
	protected $_dependentTables = array("PerfilFuncionalidadeTable");
}
?>