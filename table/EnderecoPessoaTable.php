<?php
class EnderecoPessoaTable extends Zend_Db_Table_Abstract{
	protected $_name = "endereco_pessoa";
	protected $_primary = array("CD_ENDERECO");
	protected $_referenceMap = array(
		"EnderecoTable" => array(
			"columns"=>"CD_ENDERECO",
			"refTableClass"=>"EnderecoTable",
			"refColumns"=>"CD_ENDERECO",
			"onDelete"=>self::RESTRICT
		),
		"PessoaTable" => array(
			"columns"=>"CD_PESSOA",
			"refTableClass"=>"PessoaTable",
			"refColumns"=>"CD_PESSOA",
			"onDelete"=>self::RESTRICT
		)
	);
}
?>