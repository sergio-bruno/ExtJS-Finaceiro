Ext.define('erp.store.Financeiro.FinanceiroContaReceber.ContaReceberStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Financeiro.FinanceiroContaReceber.ContaReceberModel',
    model: 'erp.model.Financeiro.FinanceiroContaReceber.ContaReceberModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Financeiro/FinanceiroContaReceberController.php?op=getListaContaReceber',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});