<?php
class CidadeTable extends Zend_Db_Table_Abstract{
	protected $_name = "cidade";
	protected $_primary = array("CD_CIDADE");
	protected $_dependentTables = array("EnderecoTable");
}
?>