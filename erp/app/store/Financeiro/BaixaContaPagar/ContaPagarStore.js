Ext.define('erp.store.Financeiro.BaixaContaPagar.ContaPagarStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Financeiro.BaixaContaPagar.ContaPagarModel',
    model: 'erp.model.Financeiro.BaixaContaPagar.ContaPagarModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Financeiro/BaixaContaPagarController.php?op=getListaContaPagar',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});