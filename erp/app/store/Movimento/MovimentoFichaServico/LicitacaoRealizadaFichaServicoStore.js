Ext.define('erp.store.Movimento.MovimentoFichaServico.LicitacaoRealizadaFichaServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.LicitacaoRealizadaFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.LicitacaoRealizadaFichaServicoModel',
    proxy: {
        type: 'memory'
    }
});