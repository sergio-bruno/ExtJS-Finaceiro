Ext.define('erp.view.Financeiro.FinanceiroContaPagar.TelaFinanceiroContaPagar', {
    extend: 'Ext.Panel',
	alias: 'widget.telaFinanceiroContaPagar',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Movimentação de Contas a Pagar',
	tbar: [
		{
			itemId: 'btnNovoContaPagar',
			text: 'Nova Conta',
			tooltip: '<b>Criar uma nova conta</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarContaPagar',
			tooltip: '<b>Editar uma conta selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirContaPagar',
			tooltip: '<b>Excluir uma conta selecionada na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de contas</b>',
			iconCls: 'refresh_16'
		},
		'-',
		{
			itemId: 'btnFiltroPesquisa',
			tooltip: '<b>Habilitar/desabilitar o filtro de pesquisa</b>',
			iconCls: 'filter_16'
		}		
	],
	items: [
		{
			xtype: 'panel',
			itemId: 'panPesquisaContaPagar',
			layout: 'absolute',
			height: 62,
			border: false,
			//hidden: true,
			items: [
				{
					x:8,y:8,
					xtype : "textfield",
					labelAlign : 'top',
					fieldLabel: 'Descrição',
					itemId : "edtDsContaPagarPesquisa",
					width: 250,
					labelWidth: 50
				},			
				{
					x:268,y:6,
					xtype: 'fieldset',
					title: 'Data para pesquisa',
					layout: 'absolute',
					itemId :'fdsDataPesquisa',
					width: 300,
					height: 50,
					items : [
						{
							xtype: 'radiogroup',
							itemId : "rdgDataPesquisa",
							x:4,
							y:0,
							width: 290,
							columns: 3,
							items : [
								{					
									boxLabel: 'Previsão',
									name: 'radioDataPesquisa',
									checked: true,
									inputValue: 'P'
								},
								{					
									boxLabel: 'Vencimento',
									name: 'radioDataPesquisa',
									inputValue: 'V'
								},
								{					
									boxLabel: 'Liquidação',
									name: 'radioDataPesquisa',
									inputValue: 'L'
								}
							]
						}
					]
				},
				{
					x:578,y:6,
					xtype: 'fieldset',
					title: 'Data',
					layout: 'absolute',
					itemId :'fdsPeriodoPesquisa',
					width: 264,
					height: 50,
					items : [
						{
							x:4,y:0,
							fieldLabel: 'De:',
							xtype : "datefield",
							itemId : "edtDtIniPesquisa",
							format: 'd/m/Y',
							labelWidth: 20,
							width: 120
						},
						{
							x:132,y:0,
							fieldLabel: 'a',
							xtype : "datefield",
							itemId : "edtDtFimPesquisa",
							format: 'd/m/Y',
							labelWidth: 10,
							width: 110
						}
					]
				},
				{ 
					x:855,y:23, 
					xtype: 'button',
					itemId: 'btnPesquisarPesquisa',
					width: 100,
					text: 'Pesquisar',
					iconCls: 'search_16'
				},
				{ 
					x:960,y:23, 
					xtype: 'button',
					itemId: 'btnLimparPesquisa',
					width: 75,
					text: 'Limpar',
					iconCls: 'cleanup_16'
				}
			]
		},
		{
			xtype : "telaFinanceiroContaPagar_gridContaPagar",
			itemId: 'gridContaPagar',
			flex: 1
		}	
	 ]
});