Ext.define('erp.store.Generico.TipoContatoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.TipoContatoModel',
    model: 'erp.model.Generico.TipoContatoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaTipoContato',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});