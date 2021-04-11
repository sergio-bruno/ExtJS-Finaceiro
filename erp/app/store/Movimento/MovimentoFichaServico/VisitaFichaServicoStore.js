Ext.define('erp.store.Movimento.MovimentoFichaServico.VisitaFichaServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.VisitaFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.VisitaFichaServicoModel',
    proxy: {
        type: 'memory'
    }
});