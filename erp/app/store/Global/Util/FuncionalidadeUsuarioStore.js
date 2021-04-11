Ext.define('erp.store.Global.Util.FuncionalidadeUsuarioStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Global.Util.FuncionalidadeUsuarioModel',
    model: 'erp.model.Global.Util.FuncionalidadeUsuarioModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Global/UtilController.php?op=getFuncionalidadeUsuario',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});