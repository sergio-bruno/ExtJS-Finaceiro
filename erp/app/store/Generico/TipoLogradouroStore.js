Ext.define('erp.store.Generico.TipoLogradouroStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.TipoLogradouroModel',
    model: 'erp.model.Generico.TipoLogradouroModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaTipoLogradouro',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});