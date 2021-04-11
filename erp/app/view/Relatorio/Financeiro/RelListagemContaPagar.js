Ext.define('erp.view.Relatorio.Financeiro.RelListagemContaPagar', {
    extend: 'Ext.Panel',
	alias: 'widget.relListagemContaPagar',
	layout: {
		type: 'hbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Relação de Contas a Pagar',
	items: [
		{
			xtype: 'panel',
			itemId: 'panPesquisa',
			layout: 'absolute',
			width: 280,
			collapsible: true,
			collapseDirection: 'left',
			title: 'Parâmetros de impressão',
			border: true,
			defaults: {
				labelAlign: 'top',
				labelSeparator: ''
			},
			items: [
				{
					x:8,y:8, 
					fieldLabel: 'Fornecedor/Transportadora/PJ',
					itemId : "cboCdPessoaPj",
					width: 264,
					xtype : "combobox",
					store: 'Generico.PessoaPjStore',
					displayField: 'NM_RAZAO_SOCIAL',
					valueField: 'CD_PESSOA_PJ',
					queryDelay: 260,
					//pageSize: 30,
					queryParam: 'nmRazaoSocial',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}	
				},
				{
					x:8,y:56, 
					fieldLabel: 'Pessoa',
					itemId : "cboCdPessoa",
					width: 264,
					xtype : "combobox",
					store: 'Generico.PessoaStore',
					displayField: 'NM_PESSOA',
					valueField: 'CD_PESSOA',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'nmPessoa',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}	
				},
				{
					x:8,y:104,
					xtype: 'fieldset',
					title: 'Data para pesquisa',
					layout: 'absolute',
					itemId :'fdsDataPesquisa',
					width: 264,
					height: 50,
					items : [
						{
							xtype: 'radiogroup',
							itemId : "rdgDataPesquisa",
							x:4,
							y:0,
							width: 260,
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
					x:8,y:162,
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
					x:8,y:226, 
					xtype: 'button',
					itemId: 'btnImprimir',
					width: 100,
					text: 'Imprimir',
					iconCls: 'print_16'
				}
			]
		},
		{
			xtype: 'container',
			itemId: 'cntRelatorio',
			flex: 1,
			html: '<div align="center"><b>Aguarde...</b></div>',
			hidden: true,
			layout: {
				type: 'vbox',
				align : 'stretch',
				pack  : 'start'
			}
		}
	]
});