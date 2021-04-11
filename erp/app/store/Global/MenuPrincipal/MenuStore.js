Ext.define('erp.store.Global.MenuPrincipal.MenuStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Global.MenuPrincipal.MenuModel',
    model: 'erp.model.Global.MenuPrincipal.MenuModel',
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});