Ext.define('erp.model.Global.MenuPrincipal.GrupoMenuModel', {
    extend: 'Ext.data.Model',
    fields: [
	  {name: 'CD_GRUPO_MENU', type: 'int', useNull: true},
	  {name: 'DS_GRUPO_MENU', type: 'string', useNull: true},
	  {name: 'NR_ORDEM', type: 'int', useNull: true}
    ], 
	idProperty: 'CD_GRUPO_MENU'
});