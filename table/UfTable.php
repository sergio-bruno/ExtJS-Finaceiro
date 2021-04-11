<?php
class UfTable extends Zend_Db_Table_Abstract{
	protected $_name = "uf";
	protected $_primary = array("CD_UF");
	protected $_dependentTables = array("UfTable");
}
?>