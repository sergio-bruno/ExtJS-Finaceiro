Ext.define('erp.model.Global.MenuPrincipal.MenuModel', {
    extend: 'Ext.data.Model',
    fields: [
	  {name: 'CD_MENU', type: 'int', useNull: true},
	  {name: 'DS_MENU', type: 'string', useNull: true},
	  {name: 'CD_MENU_PAI', type: 'int', useNull: true},
	  {name: 'NR_ORDEM', type: 'int', useNull: true},
	  {name: 'CD_FUNCIONALIDADE', type: 'int', useNull: true},
	  {name: 'DS_ID_FUNCIONALIDADE', type: 'string', useNull: true} //id da tela que será chamada
    ], 
	idProperty: 'CD_MENU'
});