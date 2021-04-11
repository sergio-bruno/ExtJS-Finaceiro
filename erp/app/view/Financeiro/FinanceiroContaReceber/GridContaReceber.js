Ext.define('erp.view.Financeiro.FinanceiroContaReceber.GridContaReceber', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaFinanceiroContaReceber_gridContaReceber',
	border: false,

    initComponent: function(){

		var store = 'Financeiro.FinanceiroContaReceber.ContaReceberStore'; 
		
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
					dataIndex: 'CD_CONTA_RECEBER'
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
					dataIndex: 'DS_CONTA_RECEBER'
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
					text   : 'Nome de Fantasia Pagador PF/PJ',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'NM_FANTASIA'
				},
				{
					text   : 'Razão Social Pagador PF/PJ',
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
				},
				{
					text   : 'Cód. Boleto',
					width    : 80,
					hidden: true,
					dataIndex: 'CD_BOLETO_BANCARIO'
				},
				{
					text   : 'Local de Pagamento',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_LOCAL_PAGAMENTO'
				},
				{
                    text   : 'Data Doc.',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_DOCUMENTO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'Cód. Esp. Doc.',
					width    : 80,
					hidden: true,
					dataIndex: 'CD_ESPECIE_DOCUMENTO'
				},
				{
					text   : 'Espécie do Documento',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_ESPECIE_DOCUMENTO'
				},
				{
					text   : 'Aceite',
					width    : 75,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_ACEITE'
				},
				{
					text   : 'Nosso Número',
					width    : 85,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'CD_NOSSO_NUMERO'
				},
				{
					text   : 'Carteira',
					width    : 100,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_CARTEIRA'
				},
				{
                    text   : 'Data Protesto',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_PROTESTO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
                    text   : 'Data Abatimento',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_ABATIMENTO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
                    text   : 'Data Desc.',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_DESCONTO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'Instruções',
					width    : 85,
					sortable : true,
					hideable: false,
					//flex: 1,
					dataIndex: 'DS_INSTRUCOES'
				}
			]
		});
			
		this.callParent(arguments);
    }
});

