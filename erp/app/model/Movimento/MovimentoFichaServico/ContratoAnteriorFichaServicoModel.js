Ext.define('erp.model.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_OS_CONTRATO', type: 'int', useNull: true},
	  {name: 'NR_OS', type: 'int', useNull: true},
	  {name: 'DS_OBSERVACOES', type: 'string', useNull: true}
	], 
	idProperty: 'CD_OS_CONTRATO'
});