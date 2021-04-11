Ext.define('erp.store.Cadastro.CadastroRedeSocial.RedeSocialStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroRedeSocial.RedeSocialModel',
    model: 'erp.model.Cadastro.CadastroRedeSocial.RedeSocialModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroRedeSocialController.php?op=getListaRedeSocial',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});