Ext.define('erp.store.Cadastro.CadastroFornecedor.FornecedorStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroFornecedor.FornecedorModel',
    model: 'erp.model.Cadastro.CadastroFornecedor.FornecedorModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroFornecedorController.php?op=getListaFornecedor',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});