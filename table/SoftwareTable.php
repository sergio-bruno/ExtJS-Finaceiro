<?php
class SoftwareTable extends Zend_Db_Table_Abstract{
	protected $_name = "software";
	protected $_primary = array("CD_SOFTWARE");
	protected $_dependentTables = array("EmpresaSoftwareTable", "SoftwareFuncionalidadeTable");
}
?>