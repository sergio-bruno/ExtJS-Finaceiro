<?php
class ContatoPessoaPjTable extends Zend_Db_Table_Abstract{
	protected $_name = "contato_pessoa_pj";
	protected $_primary = array("CD_CONTATO");
	protected $_referenceMap = array(
		"ContatoTable" => array(
			"columns"=>"CD_CONTATO",
			"refTableClass"=>"ContatoTable",
			"refColumns"=>"CD_CONTATO",
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