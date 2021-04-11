Ext.define('erp.store.Cadastro.CadastroEspecialidade.EspecialidadeStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroEspecialidade.EspecialidadeModel',
    model: 'erp.model.Cadastro.CadastroEspecialidade.EspecialidadeModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroEspecialidadeController.php?op=getListaEspecialidade',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});