<?php
class PessoaTable extends Zend_Db_Table_Abstract{
	protected $_name = "pessoa";
	protected $_primary = array("CD_PESSOA");
	protected $_dependentTables = array("UsuarioTable","EnderecoTable");
}
?>