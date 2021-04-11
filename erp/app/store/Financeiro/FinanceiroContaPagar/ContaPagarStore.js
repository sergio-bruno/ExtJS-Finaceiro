Ext.define('erp.store.Financeiro.FinanceiroContaPagar.ContaPagarStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Financeiro.FinanceiroContaPagar.ContaPagarModel',
    model: 'erp.model.Financeiro.FinanceiroContaPagar.ContaPagarModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Financeiro/FinanceiroContaPagarController.php?op=getListaContaPagar',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});