<?php
class RedeSocialPessoaTable extends Zend_Db_Table_Abstract{
	protected $_name = "rede_social_pessoa";
	protected $_primary = array("CD_REDE_SOCIAL_PESSOA");
	protected $_referenceMap = array(
		"RedeSocialTable" => array(
			"columns"=>"CD_REDE_SOCIAL",
			"refTableClass"=>"RedeSocialTable",
			"refColumns"=>"CD_REDE_SOCIAL",
			"onDelete"=>self::RESTRICT
		),

		"PessoaTable" => array(
			"columns"=>"CD_PESSOA",
			"refTableClass"=>"PessoaTable",
			"refColumns"=>"CD_PESSOA",
			"onDelete"=>self::RESTRICT
		),

		"EmpresaTable" => array(
			"columns"=>"CD_EMPRESA",
			"refTableClass"=>"EmpresaTable",
			"refColumns"=>"CD_EMPRESA",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>