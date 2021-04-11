Ext.define('erp.store.Global.MenuPrincipal.GrupoMenuStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Global.MenuPrincipal.GrupoMenuModel',
    model: 'erp.model.Global.MenuPrincipal.GrupoMenuModel',
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