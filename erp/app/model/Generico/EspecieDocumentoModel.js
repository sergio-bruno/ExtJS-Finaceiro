Ext.define('erp.model.Generico.EspecieDocumentoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_ESPECIE_DOCUMENTO', type: 'int', useNull: true},
	  {name: 'DS_ESPECIE_DOCUMENTO', type: 'string', useNull: true},
	  {name: 'CD_EXTERNO', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_ESPECIE_DOCUMENTO'
});