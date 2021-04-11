Ext.define('erp.store.Cadastro.CadastroFornecedor.EnderecoFornecedorStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroFornecedor.EnderecoFornecedorModel',
    model: 'erp.model.Cadastro.CadastroFornecedor.EnderecoFornecedorModel',
    proxy: {
        type: 'memory'
    }
});