Ext.define('erp.model.Movimento.MovimentoFichaServico.InvestimentoFichaServicoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_OS_INVESTIMENTO', type: 'int', useNull: true},
	  {name: 'NR_OS', type: 'int', useNull: true},
	  {name: 'DS_INVESTIMENTO', type: 'string', useNull: true},
 	  {name: 'VL_INVESTIMENTO', type: 'float', useNull: true}
	], 
	idProperty: 'CD_OS_INVESTIMENTO'
});