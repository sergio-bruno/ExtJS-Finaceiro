Ext.define('erp.store.Generico.EstadoCivilStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.EstadoCivilModel',
    model: 'erp.model.Generico.EstadoCivilModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaEstadoCivil',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});