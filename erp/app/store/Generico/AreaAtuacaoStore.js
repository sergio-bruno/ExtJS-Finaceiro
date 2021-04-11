Ext.define('erp.store.Generico.AreaAtuacaoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.AreaAtuacaoModel',
    model: 'erp.model.Generico.AreaAtuacaoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaAreaAtuacao',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});