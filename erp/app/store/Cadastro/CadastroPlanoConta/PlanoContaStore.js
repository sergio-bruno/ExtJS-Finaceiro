Ext.define('erp.store.Cadastro.CadastroPlanoConta.PlanoContaStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroPlanoConta.PlanoContaModel',
    model: 'erp.model.Cadastro.CadastroPlanoConta.PlanoContaModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroPlanoContaController.php?op=getListaPlanoConta',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});