Ext.define('erp.model.Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_OS_LICITACAO', type: 'int', useNull: true},
	  {name: 'CD_LICITACAO', type: 'string', useNull: true},
	  {name: 'NR_OS', type: 'int', useNull: true},
	  {name: 'DS_OBSERVACOES', type: 'string', useNull: true},
	  {name: 'SN_REALIZADA', type: 'string', useNull: true},
 	  {name: 'SN_PARTICIPA', type: 'string', useNull: true}
	], 
	idProperty: 'CD_OS_LICITACAO'
});