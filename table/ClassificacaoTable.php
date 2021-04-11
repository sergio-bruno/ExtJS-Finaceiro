<?php
class ClassificacaoTable extends Zend_Db_Table_Abstract{
	protected $_name = "classificacao";
	protected $_primary = array("CD_CLASSIFICACAO");
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