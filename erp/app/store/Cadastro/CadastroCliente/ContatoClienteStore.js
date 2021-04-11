Ext.define('erp.store.Cadastro.CadastroCliente.ContatoClienteStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroCliente.ContatoClienteModel',
    model: 'erp.model.Cadastro.CadastroCliente.ContatoClienteModel',
    proxy: {
        type: 'memory'
    }
});