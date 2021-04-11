Ext.define('erp.model.Generico.TipoLogradouroModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_TIPO_LOGRADOURO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_LOGRADOURO', type: 'string', useNull: true},
	  {name: 'DS_TIPO_LOGRADOURO_ABREV', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_TIPO_LOGRADOURO'
});