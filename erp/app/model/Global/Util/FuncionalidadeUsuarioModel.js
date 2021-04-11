Ext.define('erp.model.Global.Util.FuncionalidadeUsuarioModel', {
    extend: 'Ext.data.Model',
    fields: [
	  {name: 'CD_FUNCIONALIDADE', type: 'int', useNull: true},
	  {name: 'DS_ID_FUNCIONALIDADE', type: 'string', useNull: true}
    ], 
	idProperty: 'CD_FUNCIONALIDADE'
});