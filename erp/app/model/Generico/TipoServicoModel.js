Ext.define('erp.model.Generico.TipoServicoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_TIPO_SERVICO', type: 'int', useNull: true},
	  {name: 'DS_TIPO_SERVICO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_TIPO_SERVICO'
});