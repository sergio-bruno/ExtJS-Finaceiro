Ext.define('erp.store.Cadastro.CadastroTipoContato.TipoContatoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroTipoContato.TipoContatoModel',
    model: 'erp.model.Cadastro.CadastroTipoContato.TipoContatoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroTipoContatoController.php?op=getListaTipoContato',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});