<?php
class ContaReceberTable extends Zend_Db_Table_Abstract{
	protected $_name = "conta_receber";
	protected $_primary = array("CD_CONTA_RECEBER");
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

		"PlanoContaTable" => array(
			"columns"=>"CD_PLANO_CONTA",
			"refTableClass"=>"PlanoContaTable",
			"refColumns"=>"CD_PLANO_CONTA",
			"onDelete"=>self::RESTRICT
		),

		"PessoaPjTable" => array(
			"columns"=>"CD_PESSOA_PJ",
			"refTableClass"=>"PessoaPjTable",
			"refColumns"=>"CD_PESSOA_PJ",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>