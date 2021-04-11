<?php
class ContaPagarTable extends Zend_Db_Table_Abstract{
	protected $_name = "conta_pagar";
	protected $_primary = array("CD_CONTA_PAGAR");
	protected $_referenceMap = array(
		"EmpresaTable" => array(
			"columns"=>"CD_EMPRESA",
			"refTableClass"=>"EmpresaTable",
			"refColumns"=>"CD_EMPRESA",
			"onDelete"=>self::RESTRICT
		),

		"PessoaTable" => array(
			"columns"=>"CD_PESSOA",
			"refTableClass"=>"PessoaTable",
			"refColumns"=>"CD_PESSOA",
			"onDelete"=>self::RESTRICT
		),

		"UsuarioTable" => array(
			"columns"=>"CD_USUARIO_CADASTRO",
			"refTableClass"=>"UsuarioTable",
			"refColumns"=>"CD_USUARIO",
			"onDelete"=>self::RESTRICT
		),

		"UsuarioTable" => array(
			"columns"=>"CD_USUARIO_ALTERACAO",
			"refTableClass"=>"UsuarioTable",
			"refColumns"=>"CD_USUARIO",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>