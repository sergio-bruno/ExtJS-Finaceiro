Ext.define('erp.store.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoDbStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoModel',
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