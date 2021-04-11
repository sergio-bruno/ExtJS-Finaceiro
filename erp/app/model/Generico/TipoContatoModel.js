Ext.define('erp.model.Generico.TipoContatoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_TIPO_CONTATO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_CONTATO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_TIPO_CONTATO'
});