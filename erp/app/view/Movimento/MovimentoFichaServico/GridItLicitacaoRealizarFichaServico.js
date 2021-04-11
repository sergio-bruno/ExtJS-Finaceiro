Ext.define('erp.view.Movimento.MovimentoFichaServico.GridItLicitacaoRealizarFichaServico', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaMovimentoFichaServicoEdit_gridItLicitacaoRealizarFichaServico',

    initComponent: function(){
		
		var store = 'Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				markDirty : false,
				emptyText: 'Não há registros para exibir'
			},
			stripeRows: true,
			columnLines: true,
			columns: [
				{
					text   : 'Cód. Lic. a Realizar',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_OS_LICITACAO'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'NR_OS'
				},
				{
					text   : 'Licitação',
					width    : 110,
					sortable : true,
					hideable: false,
					dataIndex: 'CD_LICITACAO'
				},
				{
					text   : 'Participa',
					width    : 53,
					sortable : true,
					hideable: false,
					dataIndex: 'SN_PARTICIPA'
				},
				{
					text   : 'Descrição da Licitação',
					width    : 100,
					sortable : true,
					hideable: false,
					flex : 1,
					dataIndex: 'DS_OBSERVACOES'
				},
				{
					text   : 'Realizada',
					hidden: true,
					width    : 100,
					sortable : true,
					hideable: false,
					dataIndex: 'SN_REALIZADA'
				}
			]
		});
			
		this.callParent(arguments);
    }
});