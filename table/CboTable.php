<?php
class CboTable extends Zend_Db_Table_Abstract{
	protected $_name = "cbo";
	protected $_primary = array("CD_CBO");
	protected $_dependentTables = array("FuncionarioTable");
}
?>