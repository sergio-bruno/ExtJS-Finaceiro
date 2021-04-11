Ext.define('erp.store.Cadastro.CadastroFornecedor.ContatoFornecedorStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroFornecedor.ContatoFornecedorModel',
    model: 'erp.model.Cadastro.CadastroFornecedor.ContatoFornecedorModel',
    proxy: {
        type: 'memory'
    }
});