Ext.define('erp.model.Generico.ReligiaoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_RELIGIAO', type: 'int', useNull: true},
	  {name: 'DS_RELIGIAO', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_RELIGIAO'
});