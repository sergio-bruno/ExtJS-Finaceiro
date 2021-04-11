Ext.define('erp.store.Cadastro.CadastroCliente.ClienteStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroCliente.ClienteModel',
    model: 'erp.model.Cadastro.CadastroCliente.ClienteModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroClienteController.php?op=getListaCliente',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});