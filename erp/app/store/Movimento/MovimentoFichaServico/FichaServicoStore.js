Ext.define('erp.store.Movimento.MovimentoFichaServico.FichaServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.FichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.FichaServicoModel',
	pageSize: 50,
    proxy: {
        type: 'ajax',
		url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaFichaServico',	
        reader: {
            type: 'json',
            root: 'items', //Propriedade data do json
			totalProperty: 'totalCount',
			messageProperty: 'message',
            successProperty: 'success' //Propriedade de sucesso do json
        }
    }
});