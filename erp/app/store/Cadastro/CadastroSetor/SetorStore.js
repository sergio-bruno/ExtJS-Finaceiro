Ext.define('erp.store.Cadastro.CadastroSetor.SetorStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroSetor.SetorModel',
    model: 'erp.model.Cadastro.CadastroSetor.SetorModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroSetorController.php?op=getListaSetor',
        api: {
            create: '../erp/controller/Cadastro/CadastroSetorController.php?op=inserir',
            update: '../erp/controller/Cadastro/CadastroSetorController.php?op=alterar',
            destroy: '../erp/controller/Cadastro/CadastroSetorController.php?op=excluir',
        },
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'items'
        }
    }
});