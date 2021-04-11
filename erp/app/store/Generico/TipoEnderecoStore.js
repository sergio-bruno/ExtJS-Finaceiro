Ext.define('erp.store.Generico.TipoEnderecoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.TipoEnderecoModel',
    model: 'erp.model.Generico.TipoEnderecoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaTipoEndereco',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});