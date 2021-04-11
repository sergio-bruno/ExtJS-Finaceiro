Ext.define('erp.model.Generico.CidadeModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_CIDADE', type: 'int', useNull: true},
	  {name: 'DS_CIDADE', type: 'string', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_IBGE', type: 'string', useNull: true},
	  {name: 'CD_UF', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_CIDADE'
});