Ext.define('erp.store.Cadastro.CadastroStatusCliente.StatusClienteStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroStatusCliente.StatusClienteModel',
    model: 'erp.model.Cadastro.CadastroStatusCliente.StatusClienteModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Cadastro/CadastroStatusClienteController.php?op=getListaStatusCliente',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});