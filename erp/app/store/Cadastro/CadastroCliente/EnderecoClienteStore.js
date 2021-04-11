Ext.define('erp.store.Cadastro.CadastroCliente.EnderecoClienteStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroCliente.EnderecoClienteModel',
    model: 'erp.model.Cadastro.CadastroCliente.EnderecoClienteModel',
    proxy: {
        type: 'memory'
    }
});