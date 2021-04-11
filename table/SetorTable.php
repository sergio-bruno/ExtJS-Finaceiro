<?php
class SetorTable extends Zend_Db_Table_Abstract{
	protected $_name = "setor";
	protected $_primary = array("CD_SETOR");
	protected $_dependentTables = array("SetorTable");
}
?>