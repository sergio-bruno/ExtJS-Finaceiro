<?php
class PessoaPjFabricanteTable extends Zend_Db_Table_Abstract{
	protected $_name = "pessoa_pj_fabricante";
	protected $_primary = array("CD_PESSOA_PJ");
	protected $_referenceMap = array(
		"PessoaPjTable" => array(
			"columns"=>"CD_PESSOA_PJ",
			"refTableClass"=>"PessoaPjTable",
			"refColumns"=>"CD_PESSOA_PJ",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>