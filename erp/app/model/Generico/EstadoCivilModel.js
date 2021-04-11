Ext.define('erp.model.Generico.EstadoCivilModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_ESTADO_CIVIL', type: 'int', useNull: true},
	  {name: 'DS_ESTADO_CIVIL', type: 'string', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_ESTADO_CIVIL'
});