<?php
class ContatoTable extends Zend_Db_Table_Abstract{
	protected $_name = "contato";
	protected $_primary = array("CD_CONTATO");
	protected $_referenceMap = array(
		"TipoContatoTable" => array(
			"columns"=>"CD_TIPO_CONTATO",
			"refTableClass"=>"TipoContatoTable",
			"refColumns"=>"CD_TIPO_CONTATO",
			"onDelete"=>self::RESTRICT
		)
	);
}
?>