<?php
class VisitaTable extends Zend_Db_Table_Abstract{
	protected $_name = "visita";
	protected $_primary = array("CD_VISITA");
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