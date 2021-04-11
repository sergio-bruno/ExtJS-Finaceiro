<?php
class PessoaPjClienteTable extends Zend_Db_Table_Abstract{
	protected $_name = "pessoa_pj_cliente";
	protected $_primary = array("CD_PESSOA_PJ");
	protected $_referenceMap = array(
		"PessoaPjTable" => array(
			"columns"=>"CD_PESSOA_PJ",
			"refTableClass"=>"PessoaPjTable",
			"refColumns"=>"CD_PESSOA_PJ",
			"onDelete"=>self::RESTRICT
		),

		"StatusClienteTable" => array(
			"columns"=>"CD_STATUS_CLIENTE",
			"refTableClass"=>"StatusClienteTable",
			"refColumns"=>"CD_STATUS_CLIENTE",
			"onDelete"=>self::RESTRICT
		),

		"ClassificacaoTable" => array(
			"columns"=>"CD_CLASSIFICACAO",
			"refTableClass"=>"ClassificacaoTable",
			"refColumns"=>"CD_CLASSIFICACAO",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>