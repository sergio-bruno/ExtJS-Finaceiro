Ext.define('erp.model.Movimento.MovimentoFichaServico.FichaServicoModel', {
    extend: 'Ext.data.Model',
    fields: [
	  // Informações cadastrais 		
      {name: 'CD_OS', type: 'int', useNull: true},
	  {name: 'CD_PESSOA_PJ', type: 'int', useNull: true},
	  {name: 'NM_FANTASIA', type: 'string', useNull: true},
	  {name: 'NM_RAZAO_SOCIAL', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
	  {name: 'NR_SEQUENCIAL_EMPRESA', type: 'int', useNull: true},
	  {name: 'CD_STATUS_FICHA', type: 'int', useNull: true},
	  {name: 'DS_STATUS_FICHA', type: 'string', useNull: true},
	  {name: 'NM_CONTRATANTE', type: 'string', useNull: true},
	  {name: 'CD_TIPO_SERVICO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_SERVICO', type: 'string', useNull: true},
	  {name: 'CD_AREA_ATUACAO', type: 'int', useNull: true},
	  {name: 'DS_AREA_ATUACAO', type: 'string', useNull: true},
	  {name: 'DS_PERFIL_GESTOR', type: 'string', useNull: true},
	  {name: 'DS_BARREIRA', type: 'string', useNull: true},
	  {name: 'VL_TOTAL_OS', type: 'float', useNull: true},
	  {name: 'DT_ABERTURA', type: 'date', dateFormat: 'Y-m-d', useNull: true},
	  /* Contratos */
	  {name: 'IT_CONTRATOS_ANTERIORES', type: 'string', useNull: true},
	  /* Investimentos */
	  {name: 'IT_INVESTIMENTOS', type: 'string', useNull: true},
	  /* Licitações realizadas */
	  {name: 'IT_LICITACOES_REALIZADAS', type: 'string', useNull: true},
	  /* Visitas */
	  {name: 'IT_VISITAS', type: 'string', useNull: true},
	  /* Ações comerciais */
	  {name: 'IT_ACOES_COMERCIAIS', type: 'string', useNull: true},
	  /* Licitações realizadas */
	  {name: 'IT_LICITACOES_REALIZAR', type: 'string', useNull: true}
	  ], 
	idProperty: 'CD_OS'
});