Ext.define('erp.store.Financeiro.BaixaContaReceber.ContaReceberStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Financeiro.BaixaContaReceber.ContaReceberModel',
    model: 'erp.model.Financeiro.BaixaContaReceber.ContaReceberModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Financeiro/BaixaContaReceberController.php?op=getListaContaReceber',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});