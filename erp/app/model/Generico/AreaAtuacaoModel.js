Ext.define('erp.model.Generico.AreaAtuacaoModel', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'CD_AREA_ATUACAO', type: 'int', useNull: true},
	  {name: 'DS_AREA_ATUACAO', type: 'string', useNull: true},
	  {name: 'SN_ATIVO', type: 'string', useNull: true},
	  {name: 'CD_EMPRESA', type: 'int', useNull: true}
    ], 
	idProperty: 'CD_AREA_ATUACAO'
});