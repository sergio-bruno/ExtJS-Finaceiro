Ext.define('erp.store.Generico.CidadeStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.CidadeModel',
    model: 'erp.model.Generico.CidadeModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaCidade',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});