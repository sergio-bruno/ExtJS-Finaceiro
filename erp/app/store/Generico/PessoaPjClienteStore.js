Ext.define('erp.store.Generico.PessoaPjClienteStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Generico.PessoaPjClienteModel',
    model: 'erp.model.Generico.PessoaPjClienteModel',
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Generico/GenericoController.php?op=getListaPessoaPjCliente',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});