Ext.define('erp.store.Cadastro.CadastroPessoa.EnderecoPessoaDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroPessoa.EnderecoPessoaModel',
    model: 'erp.model.Cadastro.CadastroPessoa.EnderecoPessoaModel',
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