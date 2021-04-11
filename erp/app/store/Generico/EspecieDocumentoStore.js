Ext.define('erp.store.Generico.EspecieDocumentoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.EspecieDocumentoModel',
    model: 'erp.model.Generico.EspecieDocumentoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaEspecieDocumento',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});