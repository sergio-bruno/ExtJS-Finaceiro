<?php
class EmpresaTable extends Zend_Db_Table_Abstract{
	protected $_name = "empresa";
	protected $_primary = array("CD_EMPRESA");
	protected $_dependentTables = array("PerfilTable", "PessoaTable", "PessoaPjTable", "SetorTable", "TipoContatoTable", "TipoEnderecoTable", "TipoMovimentoTable", "UsuarioTable", "EspecialidadeTable");
}
?>