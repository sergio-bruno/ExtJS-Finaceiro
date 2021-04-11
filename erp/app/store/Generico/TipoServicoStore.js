Ext.define('erp.store.Generico.TipoServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.TipoServicoModel',
    model: 'erp.model.Generico.TipoServicoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaTipoServico',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});