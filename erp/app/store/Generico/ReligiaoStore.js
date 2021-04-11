Ext.define('erp.store.Generico.ReligiaoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.ReligiaoModel',
    model: 'erp.model.Generico.ReligiaoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaReligiao',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});