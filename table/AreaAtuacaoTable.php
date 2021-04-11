<?php
class AreaAtuacaoTable extends Zend_Db_Table_Abstract{
	protected $_name = "area_atuacao";
	protected $_primary = array("CD_AREA_ATUACAO");
	protected $_dependentTables = array("PessoaPjClienteTable");
	protected $_referenceMap = array(
		"EmpresaTable" => array(
			"columns"=>"CD_EMPRESA",
			"refTableClass"=>"EmpresaTable",
			"refColumns"=>"CD_EMPRESA",
			"onDelete"=>self::RESTRICT
		),

	);

}
?>