Ext.define('erp.store.Cadastro.CadastroCliente.VisitaClienteStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Cadastro.CadastroCliente.VisitaClienteModel',
    model: 'erp.model.Cadastro.CadastroCliente.VisitaClienteModel',
	pageSize: 50,
    proxy: {
        type: 'memory'
    }
});