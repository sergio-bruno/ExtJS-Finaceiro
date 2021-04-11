Ext.define('erp.model.Generico.CargoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_CARGO', type: 'int', useNull: true},
	  {name: 'DS_CARGO', type: 'string', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true}
    ], 
	idProperty: 'CD_CARGO'
});