Ext.define('erp.store.Cadastro.CadastroAreaAtuacao.AreaAtuacaoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroAreaAtuacao.AreaAtuacaoModel',
    model: 'erp.model.Cadastro.CadastroAreaAtuacao.AreaAtuacaoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroAreaAtuacaoController.php?op=getListaAreaAtuacao',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});