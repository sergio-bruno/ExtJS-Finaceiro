Ext.define('erp.model.Generico.RedeSocialModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_REDE_SOCIAL', type: 'int', useNull: true},
	  {name: 'DS_REDE_SOCIAL', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true},
 	  {name: 'SN_ATIVO', type: 'string', useNull: true}
	], 
	idProperty: 'CD_REDE_SOCIAL'
});