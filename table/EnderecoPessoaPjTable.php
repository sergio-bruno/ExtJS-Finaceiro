<?php
class EnderecoPessoaPjTable extends Zend_Db_Table_Abstract{
	protected $_name = "endereco_pessoa_pj";
	protected $_primary = array("CD_ENDERECO");
	protected $_referenceMap = array(
		"EnderecoTable" => array(
			"columns"=>"CD_ENDERECO",
			"refTableClass"=>"EnderecoTable",
			"refColumns"=>"CD_ENDERECO",
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