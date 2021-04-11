Ext.define('erp.store.Cadastro.CadastroClassificacao.ClassificacaoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroClassificacao.ClassificacaoModel',
    model: 'erp.model.Cadastro.CadastroClassificacao.ClassificacaoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroClassificacaoController.php?op=getListaClassificacao',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});