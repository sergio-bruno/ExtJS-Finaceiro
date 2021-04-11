Ext.define('erp.store.Cadastro.CadastroTipoConselho.TipoConselhoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroTipoConselho.TipoConselhoModel',
    model: 'erp.model.Cadastro.CadastroTipoConselho.TipoConselhoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroTipoConselhoController.php?op=getListaTipoConselho',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});