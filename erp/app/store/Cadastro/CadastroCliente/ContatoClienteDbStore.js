Ext.define('erp.store.Cadastro.CadastroCliente.ContatoClienteDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroCliente.ContatoClienteModel',
    model: 'erp.model.Cadastro.CadastroCliente.ContatoClienteModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});