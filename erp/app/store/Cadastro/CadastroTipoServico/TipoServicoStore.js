Ext.define('erp.store.Cadastro.CadastroTipoServico.TipoServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroTipoServico.TipoServicoModel',
    model: 'erp.model.Cadastro.CadastroTipoServico.TipoServicoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroTipoServicoController.php?op=getListaTipoServico',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});