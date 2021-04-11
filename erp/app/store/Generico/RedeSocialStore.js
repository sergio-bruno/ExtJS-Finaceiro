Ext.define('erp.store.Generico.RedeSocialStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.RedeSocialModel',
    model: 'erp.model.Generico.RedeSocialModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaRedeSocial',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});