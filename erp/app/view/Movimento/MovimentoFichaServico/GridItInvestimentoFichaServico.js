Ext.define('erp.view.Movimento.MovimentoFichaServico.GridItInvestimentoFichaServico', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaMovimentoFichaServicoEdit_gridItInvestimentoFichaServico',

    initComponent: function(){
		
		var store = 'Movimento.MovimentoFichaServico.InvestimentoFichaServicoStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				markDirty : false,
				emptyText: 'Não há registros para exibir',
				getRowClass : function (row, index) { 
				  if (row.get('SN_ATIVO') == 'N') {
					return 'grid-inactive-row'; //Pinta a linha se o registro estiver inativo
				  } 
				}
			},
			stripeRows: true,
			columnLines: true,
			columns: [
				{
					text   : 'Cód. Investimento',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_OS_INVESTIMENTO'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'NR_OS'
				},
				{
					text   : 'Descrição do Investimento',
					width    : 100,
					sortable : true,
					hideable: false,
					flex : 1,
					dataIndex: 'DS_INVESTIMENTO'
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. do Investimento',
					width    : 120,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_INVESTIMENTO'
				}
			]
		});
			
		this.callParent(arguments);
    }
});