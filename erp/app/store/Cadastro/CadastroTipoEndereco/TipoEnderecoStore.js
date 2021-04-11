Ext.define('erp.store.Cadastro.CadastroTipoEndereco.TipoEnderecoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroTipoEndereco.TipoEnderecoModel',
    model: 'erp.model.Cadastro.CadastroTipoEndereco.TipoEnderecoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroTipoEnderecoController.php?op=getListaTipoEndereco',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});