Ext.define('erp.store.Cadastro.CadastroPessoa.RedeSocialPessoaStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroPessoa.RedeSocialPessoaModel',
    model: 'erp.model.Cadastro.CadastroPessoa.RedeSocialPessoaModel',
    proxy: {
        type: 'memory'
    }
});