Ext.define('erp.store.Cadastro.CadastroFornecedor.ContatoFornecedorDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroFornecedor.ContatoFornecedorModel',
    model: 'erp.model.Cadastro.CadastroFornecedor.ContatoFornecedorModel',
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