Ext.define('erp.model.Global.SelecaoSetor.SetorModel', {
    extend: 'Ext.data.Model',
    fields: [
	  {name: 'CD_SETOR', type: 'int', useNull: true},
	  {name: 'DS_SETOR', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_SETOR'
});