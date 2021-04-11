Ext.define('erp.view.Movimento.MovimentoFichaServico.GridItVisitaFichaServico', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaMovimentoFichaServicoEdit_gridItVisitaFichaServico',

    initComponent: function(){
		
		var store = 'Movimento.MovimentoFichaServico.VisitaFichaServicoStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				markDirty : false,
				emptyText: 'Não há registros para exibir',
				getRowClass : function (row, index) { 
				  if (row.get('SN_ATIVO') == 'N') {
					return 'grid-inactive-row'; 
				  } 
				}
			},
			stripeRows: true,
			columnLines: true,
			columns: [
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_OS_VISITA'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'NR_OS'
				},
				{
                    text   : 'Dt. Visita',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_VISITA',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'Observações',
					width    : 70,
					hideable: true,
					flex : 1,
					dataIndex: 'DS_OBSERVACOES'
				}
			]
		});
			
		this.callParent(arguments);
    }
});