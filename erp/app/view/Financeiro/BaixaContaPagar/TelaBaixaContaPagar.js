Ext.define('erp.view.Financeiro.BaixaContaPagar.TelaBaixaContaPagar', {
    extend: 'Ext.Panel',
	alias: 'widget.telaBaixaContaPagar',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Baixa Rápida de Contas a Pagar',
	tbar: [
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
					width: 200,
					labelWidth: 50
				},			
				{
					x:218,y:0,
					xtype: 'fieldset',
					title: 'Data para pesquisa',
					layout: 'absolute',
					itemId :'fdsDataPesquisa',
					width: 210,
					height: 58,
					items : [
						{
							xtype: 'radiogroup',
							itemId : "rdgDataPesquisa",
							x:4,
							y:0,
							width: 200,
							columns: 2,
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
					x:438,y:6,
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
					x:715,y:0,
					xtype: 'fieldset',
					title: 'Situação',
					layout: 'absolute',
					itemId :'fdsSituacaoPesquisa',
					width: 300,
					height: 58,
					items : [
						{
							xtype: 'radiogroup',
							itemId : "rdgSituacaoPesquisa",
							x:4,
							y:0,
							width: 290,
							columns: 3,
							items : [
								{					
									boxLabel: 'Aberta',
									name: 'radioSituacaoPesquisa',
									checked: true,
									inputValue: 'A'
								},
								{					
									boxLabel: 'Devolvida',
									name: 'radioSituacaoPesquisa',
									inputValue: 'D'
								},
								{					
									boxLabel: 'Liquidada',
									name: 'radioSituacaoPesquisa',
									inputValue: 'L'
								},
								{					
									boxLabel: 'Cancelada',
									name: 'radioSituacaoPesquisa',
									inputValue: 'C'
								},
								{					
									boxLabel: 'Negativada',
									name: 'radioSituacaoPesquisa',
									inputValue: 'N'
								},
								{					
									boxLabel: 'Todas',
									name: 'radioSituacaoPesquisa',
									inputValue: ''
								}
							]
						}
					]
				},
				{ 
					x:1020,y:23, 
					xtype: 'button',
					itemId: 'btnPesquisarPesquisa',
					width: 80,
					text: 'Pesquisar',
					iconCls: 'search_16'
				},
				{ 
					x:1110,y:23, 
					xtype: 'button',
					itemId: 'btnLimparPesquisa',
					width: 75,
					text: 'Limpar',
					iconCls: 'cleanup_16'
				}
			]
		},
		{
			xtype : "telaBaixaContaPagar_gridContaPagar",
			itemId: 'gridContaPagar',
			flex: 1
		}	
	 ]
});