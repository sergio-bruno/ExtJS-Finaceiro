Ext.define('erp.store.Global.SelecaoSetor.SetorStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Global.SelecaoSetor.SetorModel',
    model: 'erp.model.Global.SelecaoSetor.SetorModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Global/TitlebarController.php?op=getSetorUsuario',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});