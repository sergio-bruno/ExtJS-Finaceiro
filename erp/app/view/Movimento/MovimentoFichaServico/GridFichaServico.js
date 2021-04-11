Ext.define('erp.view.Movimento.MovimentoFichaServico.GridFichaServico', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaMovimentoFichaServico_gridFichaServico',
	border: false,

    initComponent: function(){
	
		var store = 'Movimento.MovimentoFichaServico.FichaServicoStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				loadMask: false,
				emptyText: 'Não há registros para exibir',
				getRowClass : function (row, index) { 
				  if (row.get('SN_ATIVO') == 'N') {
					return 'grid-inactive-row'; 
				  } 
				}
			},
			bbar: Ext.create('Ext.toolbar.Paging', {
				store: store,
				displayInfo: true,
				items: {
					itemId: 'refresh',
					style: {
						visibility: 'hidden'
					}
				}
			}),
			stripeRows: true,
			columnLines: true,
			columns: [
				{
					text   : 'Nº OS Interno',
					width    : 80,
					align: 'right',
					hideable: true,
					hidden: true,
					dataIndex: 'NR_OS'
				},
				{
					text   : 'Nº OS',
					width    : 80,
					align: 'right',
					hideable: true,
					dataIndex: 'NR_SEQUENCIAL_EMPRESA'
				},
				{
                    text   : 'Abertura',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_ABERTURA',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'Código',
					width    : 80,
					align: 'right',
					hideable: true,
					hidden: true,
					dataIndex: 'CD_PESSOA_PJ'
				},
				{
					text   : 'Cliente',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'NM_FANTASIA'
				},
				{
					text   : 'Cód. Tp. Srv',
					width    : 80,
					align: 'right',
					hideable: true,
					hidden: true,
					dataIndex: 'CD_TIPO_SERVICO'
				},
				{
					text   : 'Tipo do Serviço',
					width    : 420,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_TIPO_SERVICO'
				},
				{
					text   : 'Contratante',
					width    : 150,
					sortable : true,
					hideable: false,
					dataIndex: 'NM_CONTRATANTE'
				},
				{
					text   : 'Cód. Área At.',
					width    : 80,
					align: 'right',
					hideable: true,
					hidden: true,
					dataIndex: 'CD_AREA_ATUACAO'
				},
				{
					text   : 'Área de Atuação',
					width    : 250,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_AREA_ATUACAO'
				},
				{
					text   : 'Cód. Status Ficha',
					width    : 80,
					align: 'right',
					hideable: true,
					hidden: true,
					dataIndex: 'CD_STATUS_FICHA'
				},
				{
					text   : 'Status da Ficha',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_STATUS_FICHA'
				},
				{
					text   : 'Perfil do Gestor',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_PERFIL_GESTOR'
				},
				{
					text   : 'Barreiras',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_BARREIRA'
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. do Serviço',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_TOTAL_OS'
				}
			]
		});
			
		this.callParent(arguments);
    }
});

