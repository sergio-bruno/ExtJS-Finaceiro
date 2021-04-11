Ext.define('erp.store.Configuracao.ConfigGeral.CadastroFuncionalidade.FuncionalidadeStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Configuracao.ConfigGeral.CadastroFuncionalidade.FuncionalidadeModel',
    model: 'erp.model.Configuracao.ConfigGeral.CadastroFuncionalidade.FuncionalidadeModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Configuracao/ConfigGeral/CadastroFuncionalidadeController.php?op=getListaFuncionalidade',
        api: {
            create: '../erp/controller/Configuracao/ConfigGeral/CadastroFuncionalidadeController.php?op=inserir',
            update: '../erp/controller/Configuracao/ConfigGeral/CadastroFuncionalidadeController.php?op=alterar',
            destroy: '../erp/controller/Configuracao/ConfigGeral/CadastroFuncionalidadeController.php?op=excluir',
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