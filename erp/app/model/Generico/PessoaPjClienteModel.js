Ext.define('erp.model.Generico.PessoaPjClienteModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_PESSOA_PJ', type: 'int', useNull: true},
	  {name: 'NM_RAZAO_SOCIAL', type: 'string', useNull: true},
	  {name: 'NM_FANTASIA', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_PESSOA_PJ'
});