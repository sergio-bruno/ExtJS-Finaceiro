Ext.define('erp.store.Cadastro.CadastroFornecedor.EnderecoFornecedorDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroFornecedor.EnderecoFornecedorModel',
    model: 'erp.model.Cadastro.CadastroFornecedor.EnderecoFornecedorModel',
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