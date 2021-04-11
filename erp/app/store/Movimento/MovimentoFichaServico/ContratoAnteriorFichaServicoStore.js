Ext.define('erp.store.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoModel',
    proxy: {
        type: 'memory'
    }
});