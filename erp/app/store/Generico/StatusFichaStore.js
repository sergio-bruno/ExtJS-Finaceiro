Ext.define('erp.store.Generico.StatusFichaStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.StatusFichaModel',
    model: 'erp.model.Generico.StatusFichaModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaStatusFicha',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});