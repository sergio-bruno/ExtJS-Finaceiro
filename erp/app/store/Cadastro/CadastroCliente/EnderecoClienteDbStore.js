Ext.define('erp.store.Cadastro.CadastroCliente.EnderecoClienteDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroCliente.EnderecoClienteModel',
    model: 'erp.model.Cadastro.CadastroCliente.EnderecoClienteModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});