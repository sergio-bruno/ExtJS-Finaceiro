Ext.define('erp.view.Movimento.MovimentoFichaServico.GridItAcaoComercialFichaServico', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaMovimentoFichaServicoEdit_gridItAcaoComercialFichaServico',

    initComponent: function(){
		
		var store = 'Movimento.MovimentoFichaServico.AcaoComercialFichaServicoStore'; 
		
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
					text   : 'Cód. da Acão Comercial',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_OS_ACAO_COMERCIAL'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'NR_OS'
				},
				{
					text   : 'Descrição da Ação Comercial',
					width    : 100,
					sortable : true,
					hideable: false,
					flex : 1,
					dataIndex: 'DS_OBSERVACOES'
				},
				{
                    text   : 'Dt. da Ação',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_ACAO_COMERCIAL',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				}
			]
		});
			
		this.callParent(arguments);
    }
});