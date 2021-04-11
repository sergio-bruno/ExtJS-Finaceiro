Ext.define('erp.model.Movimento.MovimentoFichaServico.VisitaFichaServicoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_OS_VISITA', type: 'int', useNull: true},
	  {name: 'NR_OS', type: 'int', useNull: true},
	  {name: 'DS_OBSERVACOES', type: 'string', useNull: true},
 	  {name: 'DT_VISITA', type: 'date', dateFormat: 'Y-m-d', useNull: true}
	], 
	idProperty: 'CD_OS_VISITA'
});