Ext.define('erp.store.Generico.StatusClienteStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.StatusClienteModel',
    model: 'erp.model.Generico.StatusClienteModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaStatusCliente',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});