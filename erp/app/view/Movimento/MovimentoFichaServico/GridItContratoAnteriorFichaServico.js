Ext.define('erp.view.Movimento.MovimentoFichaServico.GridItContratoAnteriorFichaServico', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaMovimentoFichaServicoEdit_gridItContratoAnteriorFichaServico',

    initComponent: function(){
		
		var store = 'Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoStore'; 
		
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
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_OS_CONTRATO'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'NR_OS'
				},
				{
					text   : 'Descrição do Contrato',
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