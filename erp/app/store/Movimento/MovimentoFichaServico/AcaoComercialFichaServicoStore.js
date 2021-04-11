Ext.define('erp.store.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoModel',
    proxy: {
        type: 'memory'
    }
});