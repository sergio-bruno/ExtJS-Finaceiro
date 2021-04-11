Ext.define('erp.view.Financeiro.BaixaContaReceber.GridContaReceber', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaBaixaContaReceber_gridContaReceber',
	border: false,

    initComponent: function(){

		var store = 'Financeiro.BaixaContaReceber.ContaReceberStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				loadMask: false,
				emptyText: 'Não há registros para exibir',
				getRowClass : function (row, index) {
					if (row.get('CD_SITUACAO') == 'L') {
						return 'grid-linha-azul'; 
					} else if (row.get('CD_SITUACAO') == 'A') {
						return 'grid-linha-verde'; 
					} else if (row.get('CD_SITUACAO') == 'C') {
						return 'grid-linha-vermelho';
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
					text   : 'Cód. Conta',
					width    : 80,
					hidden: true,
					dataIndex: 'CD_CONTA_RECEBER'
				},
				{
					text   : 'Código',
					width    : 80,
					align: 'right',
					hideable: true,
					//hidden: true,
					dataIndex: 'CD_CONTA'
				},
				{
					text   : 'Parcela',
					width    : 80,
					align: 'right',
					hideable: true,
					//hidden: true,
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
					width    : 50,
					hidden: true,
					dataIndex: 'CD_SITUACAO'
				},
				{
					text   : 'Situação',
					width    : 80,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_SITUACAO'
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
					hidden: true,
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
                    text   : 'Vencimento',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_VENCIMENTO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
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
					text   : 'Vlr. Desp. Cob.',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_DESPESA_COBRANCA',
					sortable : true,
					hideable: false
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. Abatim.',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_ABATIMENTO',
					sortable : true,
					hideable: false
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. IOF',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_IOF',
					sortable : true,
					hideable: false
				},
				{
					xtype: 'numbercolumn',
					text   : 'Vlr. Out. Créd.',
					width    : 100,
					align: 'right',
					format: ',0.00',
					dataIndex: 'VL_OUTROS_CREDITOS',
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
                    text   : 'Previsão',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_PREVISAO_CONTA',
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

