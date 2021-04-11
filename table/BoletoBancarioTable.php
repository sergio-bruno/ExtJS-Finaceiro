<?php
class BoletoBancarioTable extends Zend_Db_Table_Abstract{
	protected $_name = "boleto_bancario";
	protected $_primary = array("CD_BOLETO_BANCARIO");
	protected $_referenceMap = array(
		"ContaReceberTable" => array(
			"columns"=>"CD_CONTA_RECEBER",
			"refTableClass"=>"ContaReceberTable",
			"refColumns"=>"CD_CONTA_RECEBER",
			"onDelete"=>self::RESTRICT
		),

		"EspecieDocumentoTable" => array(
			"columns"=>"CD_ESPECIE_DOCUMENTO",
			"refTableClass"=>"EspecieDocumentoTable",
			"refColumns"=>"CD_ESPECIE_DOCUMENTO",
			"onDelete"=>self::RESTRICT
		),
		
	);

}
?>