<?php
class EspecialidadeTable extends Zend_Db_Table_Abstract{
	protected $_name = "especialidade";
	protected $_primary = array("CD_ESPECIALIDADE");
	protected $_dependentTables = array("PrestadorTable", "PrestadorTable", "AgendaCentralAmbTable", "AtendimentoTable", "DemandaReprimidaTable", "EncConsultaExternaTable", "EscalaCentralAmbTable", "PepEncaminhamentoMedicoTable", "PepSolicitacaoParecerTable", "PrestadorCirurgiaoTable", "PrestadorEspecialidadeTable", "PrestadorEspecialidadeSubespecialidadeTable", "SaoClinicasEspecialidadeTempTable", "SetorEspecialidadeTable", "SolicitacaoCirurgiaTempTable", "SubespecialidadeTable", "UnidadeAtendEspecialidadeTable");
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