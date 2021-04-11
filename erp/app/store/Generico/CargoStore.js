Ext.define('erp.store.Generico.CargoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.CargoModel',
    model: 'erp.model.Generico.CargoModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaCargo',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});