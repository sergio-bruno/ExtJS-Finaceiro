Ext.define('erp.model.Generico.StatusClienteModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_STATUS_CLIENTE', type: 'int', useNull: true},
	  {name: 'DS_STATUS_CLIENTE', type: 'string', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true}
    ], 
	idProperty: 'CD_STATUS_CLIENTE'
});