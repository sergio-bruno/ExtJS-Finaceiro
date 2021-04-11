Ext.define('erp.store.Movimento.MovimentoFichaServico.InvestimentoFichaServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.InvestimentoFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.InvestimentoFichaServicoModel',
    proxy: {
        type: 'memory'
    }
});