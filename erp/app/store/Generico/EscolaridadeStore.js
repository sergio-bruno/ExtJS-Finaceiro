Ext.define('erp.store.Generico.EscolaridadeStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.EscolaridadeModel',
    model: 'erp.model.Generico.EscolaridadeModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaEscolaridade',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});