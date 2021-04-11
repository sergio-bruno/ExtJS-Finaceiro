<?php
class PessoaPjTable extends Zend_Db_Table_Abstract{
	protected $_name = "pessoa_pj";
	protected $_primary = array("CD_PESSOA_PJ");
	protected $_dependentTables = array("EnderecoPessoaPjTable", "PessoaPjFabricanteTable", "PessoaPjFornecedorTable", "PessoaPjTransportadoraTable");
	protected $_referenceMap = array(
		"UsuarioTable" => array(
			"columns"=>"CD_USUARIO_CADASTRO",
			"refTableClass"=>"UsuarioTable",
			"refColumns"=>"CD_USUARIO",
			"onDelete"=>self::RESTRICT
		),

		"EmpresaTable" => array(
			"columns"=>"CD_EMPRESA",
			"refTableClass"=>"EmpresaTable",
			"refColumns"=>"CD_EMPRESA",
			"onDelete"=>self::RESTRICT
		),

		"CnaeTable" => array(
			"columns"=>"CD_CNAE",
			"refTableClass"=>"CnaeTable",
			"refColumns"=>"CD_CNAE",
			"onDelete"=>self::RESTRICT
		)
	);
}
?>