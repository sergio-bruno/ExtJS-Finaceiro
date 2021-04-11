Ext.define('erp.model.Generico.ClassificacaoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_CLASSIFICACAO', type: 'int', useNull: true},
	  {name: 'DS_CLASSIFICACAO', type: 'string', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true}
    ], 
	idProperty: 'CD_CLASSIFICACAO'
});