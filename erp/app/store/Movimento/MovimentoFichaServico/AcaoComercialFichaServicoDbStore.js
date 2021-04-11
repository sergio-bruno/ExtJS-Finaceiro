Ext.define('erp.store.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoModel',
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