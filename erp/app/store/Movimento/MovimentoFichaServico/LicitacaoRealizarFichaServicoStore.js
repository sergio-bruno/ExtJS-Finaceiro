Ext.define('erp.store.Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoStore', {
    extend: 'Ext.data.Store',
	requires: 'erp.model.Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoModel',
    model: 'erp.model.Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoModel',
    proxy: {
        type: 'memory'
    }
});