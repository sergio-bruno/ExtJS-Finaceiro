Ext.define('erp.model.Generico.EscolaridadeModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_ESCOLARIDADE', type: 'int', useNull: true},
	  {name: 'DS_ESCOLARIDADE', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_ESCOLARIDADE'
});