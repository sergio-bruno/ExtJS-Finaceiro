<?php
class EnderecoTable extends Zend_Db_Table_Abstract{
	protected $_name = "endereco";
	protected $_primary = array("CD_ENDERECO");
	protected $_referenceMap = array(
		"CidadeTable" => array(
			"columns"=>"CD_CIDADE",
			"refTableClass"=>"CidadeTable",
			"refColumns"=>"CD_CIDADE",
			"onDelete"=>self::RESTRICT
		),
		"TipoLogradouroTable" => array(
			"columns"=>"CD_TIPO_LOGRADOURO",
			"refTableClass"=>"TipoLogradouroTable",
			"refColumns"=>"CD_TIPO_LOGRADOURO",
			"onDelete"=>self::RESTRICT
		),
		"TipoEnderecoTable" => array(
			"columns"=>"CD_TIPO_ENDERECO",
			"refTableClass"=>"TipoEnderecoTable",
			"refColumns"=>"CD_TIPO_ENDERECO",
			"onDelete"=>self::RESTRICT
		)
	);
}
?>