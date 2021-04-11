Ext.define('erp.view.Financeiro.BaixaContaPagar.TelaBaixaContaPagarEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaBaixaContaPagarEdit',
	layout: 'fit',
    width: 660,  
    height: 225, 
    resizable: false,
	modal: true,
	title: 'Baixa de Contas a Pagar',
	items: [
		{
			xtype: 'form',
			layout: 'absolute',
			border: false,
			defaults: {
				labelAlign: 'top',
				labelSeparator: ''
			},
			items: [
				{
					xtype : "numberfield",
					itemId : "edtCdSituacao",
					name: 'CD_SITUACAO',
					hidden: true
				},
				{
					xtype : "numberfield",
					itemId : "edtCdContaPagar",
					name: 'CD_CONTA_PAGAR',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição da Conta',
					itemId : "edtDsContaPagar",
					width: 360,
					allowBlank: false,
					name: 'DS_CONTA_PAGAR'
				},
				{
					x:378,y:8,
					fieldLabel: 'Liquidação',
					xtype : "datefield",
					itemId : "edtDtLiquidacao",
					format: 'd/m/Y',
					submitFormat: 'Y-m-d',
					width: 100,
					name: 'DT_LIQUIDACAO'
				},
				{
					x:8,y:56,
					fieldLabel: 'Valor da Conta',
					itemId : "edtVlConta",
					width: 140,
					xtype : "textfield",
					plugins: "textmask",
					mask: "R$ #999.999.999.990,00",
					money: true,
					name: 'VL_CONTA'
				},
				{
					x:158,y:56,
					fieldLabel: 'Mora/Juros',
					itemId : "edtVlMoraJuro",
					width: 100,
					xtype : "textfield",
					plugins: "textmask",
					mask: "R$ #999.999.999.990,00",
					money: true,
					name: 'VL_MORA_JURO'
				},
				{
					x:268,y:56,
					fieldLabel: 'Despesa',
					itemId : "edtVlDespesa",
					width: 100,
					xtype : "textfield",
					plugins: "textmask",
					mask: "R$ #999.999.999.990,00",
					money: true,
					name: 'VL_DESPESA'
				},
				{
					x:378,y:56,
					fieldLabel: 'Desconto',
					itemId : "edtVlDesconto",
					width: 100,
					xtype : "textfield",
					plugins: "textmask",
					mask: "R$ #999.999.999.990,00",
					money: true,
					name: 'VL_DESCONTO'
				},
				{
					x:378,y:104,
					fieldLabel: 'Total da Conta',
					itemId : "edtVlLiquidacao",
					width: 100,
					xtype : "textfield",
					plugins: "textmask",
					mask: "R$ #999.999.999.990,00",
					money: true,
					name: 'VL_LIQUIDACAO',
					readOnly: true,
					fieldStyle: 'font-weight:bold; background-image: none; background-color: #FF0000',
				},
				{
					x:488,y:6,
					xtype: 'fieldset',
					title: 'Situação',
					layout: 'absolute',
					itemId :'fdsSituacaoConta',
					width: 150,
					height: 138,
					items : [
						{
							xtype: 'radiogroup',
							itemId : "rdgSituacaoConta",
							x:4,
							y:0,
							width: 130,
							columns: 1,
							items : [
								{					
									boxLabel: 'Abrir',
									name: 'radioSituacaoConta',
									inputValue: 'A'
								},
								{					
									boxLabel: 'Devolver',
									name: 'radioSituacaoConta',
									inputValue: 'D'
								},
								{					
									boxLabel: 'Liquidar',
									name: 'radioSituacaoConta',
									checked: true,
									inputValue: 'L'
								},
								{					
									boxLabel: 'Cancelar',
									name: 'radioSituacaoConta',
									inputValue: 'C'
								},
								{					
									boxLabel: 'Negativar',
									name: 'radioSituacaoConta',
									inputValue: 'N'
								}
							]
						}
					]
				}
			]
		}
    ],
	buttons: [ 
		{ 
		  itemId: 'btnSalvar',
		  width: 75,
		  height: 25,
		  text: 'Salvar',
		  iconCls: 'save_16'
		}		
	]
});