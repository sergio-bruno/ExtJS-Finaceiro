Ext.define('erp.store.Generico.ClassificacaoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.ClassificacaoModel',
    model: 'erp.model.Generico.ClassificacaoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaClassificacao',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});