Ext.define('erp.store.Cadastro.CadastroPessoa.EnderecoPessoaStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroPessoa.EnderecoPessoaModel',
    model: 'erp.model.Cadastro.CadastroPessoa.EnderecoPessoaModel',
    proxy: {
        type: 'memory'
    }
});