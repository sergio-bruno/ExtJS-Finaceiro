Ext.define('erp.model.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_OS_ACAO_COMERCIAL', type: 'int', useNull: true},
	  {name: 'NR_OS', type: 'int', useNull: true},
	  {name: 'DS_OBSERVACOES', type: 'string', useNull: true},
 	  {name: 'DT_ACAO_COMERCIAL', type: 'date', dateFormat: 'Y-m-d', useNull: true}
	], 
	idProperty: 'CD_OS_ACAO_COMERCIAL'
});