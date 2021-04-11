Ext.define('erp.view.Financeiro.FinanceiroContaPagar.GridContaPagar', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaFinanceiroContaPagar_gridContaPagar',
	border: false,

    initComponent: function(){

		var store = 'Financeiro.FinanceiroContaPagar.ContaPagarStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				loadMask: false,
				emptyText: 'Não há registros para exibir'
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
					text   : 'Cód. Conta',
					width    : 80,
					hidden: true,
					dataIndex: 'CD_CONTA_PAGAR'
				},
				{
					text   : 'Código',
					width    : 80,
					align: 'right',
					hideable: true,
					dataIndex: 'CD_CONTA'
				},
				{
					text   : 'Parcela',
					width    : 80,
					align: 'right',
					hideable: true,
					dataIndex: 'CD_PARCELA'
				},
				{
					text   : 'Descrição',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_CONTA_PAGAR'
				},
				{
					text   : 'Cód. Sit.',
					width    : 70,
					hidden: true,
					dataIndex: 'CD_SITUACAO'
				},
				{
					text   : 'Situação',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_SITUACAO'
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. da Conta',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_CONTA',
					sortable : true,
					hideable: false
				},
				
				{
					xtype: 'numbercolumn',
					text   : 'Mora/Juros',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_MORA_JURO',
					sortable : true,
					hideable: false
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. Despesa',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_DESPESA',
					sortable : true,
					hideable: false
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. Desconto',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_DESCONTO',
					sortable : true,
					hideable: false
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. Liquidado',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_LIQUIDACAO',
					sortable : true,
					hideable: false
				},
				{
					text   : 'Cód. Pessoa',
					width    : 80,
					hidden: true,
					dataIndex: 'CD_PESSOA'
				},
				{
					text   : 'Pessoa',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'NM_PESSOA'
				},
				{
					text   : 'Cód. Pessoa PJ',
					width    : 80,
					hidden: true,
					dataIndex: 'CD_PESSOA_PJ'
				},
				{
					text   : 'Nome de Fantasia Recebedor PF/PJ',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'NM_FANTASIA'
				},
				{
					text   : 'Razão Social Recebedor PF/PJ',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'NM_RAZAO_SOCIAL'
				},
				{
                    text   : 'Previsão',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_PREVISAO_CONTA',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
                    text   : 'Vencimento',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_VENCIMENTO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
                    text   : 'Liquidação',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_LIQUIDACAO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'Cód. Pl. Conta',
					width    : 80,
					hidden: true,
					dataIndex: 'CD_PLANO_CONTA'
				},
				{
					text   : 'Plano de Contas',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_PLANO_CONTA'
				},
				{
					text   : 'Observações',
					width    : 300,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_OBSERVACAO'
				}
			]
		});
			
		this.callParent(arguments);
    }
});

