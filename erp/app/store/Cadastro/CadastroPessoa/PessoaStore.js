Ext.define('erp.store.Cadastro.CadastroPessoa.PessoaStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroPessoa.PessoaModel',
    model: 'erp.model.Cadastro.CadastroPessoa.PessoaModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroPessoaController.php?op=getListaPessoa',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});