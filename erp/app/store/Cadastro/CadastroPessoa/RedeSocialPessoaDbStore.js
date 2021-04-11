Ext.define('erp.store.Cadastro.CadastroPessoa.RedeSocialPessoaDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroPessoa.RedeSocialPessoaModel',
    model: 'erp.model.Cadastro.CadastroPessoa.RedeSocialPessoaModel',
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