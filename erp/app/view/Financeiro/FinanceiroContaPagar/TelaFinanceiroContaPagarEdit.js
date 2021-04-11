Ext.define('erp.view.Financeiro.FinanceiroContaPagar.TelaFinanceiroContaPagarEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaFinanceiroContaPagarEdit',
	layout: 'fit',
    width: 660,  
    height: 355, 
    resizable: false,
	modal: true,
	title: 'Contas a Pagar',
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
					itemId : "edtCdContaPagar",
					name: 'CD_CONTA_PAGAR',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Código da Conta',
					itemId : "edtCdConta",
					width: 100,
					name: 'CD_CONTA'
				},
				{
					x:118,y:8,
					xtype : "textfield",
					fieldLabel: 'Parcela',
					itemId : "edtCdParcela",
					width: 50,
					name: 'CD_PARCELA'
				},
				{
					x:178,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição da Conta',
					itemId : "edtDsContaPagar",
					width: 340,
					allowBlank: false,
					name: 'DS_CONTA_PAGAR'
				},
				{
					xtype : "numberfield",
					itemId : "edtCdSituacao",
					name: 'CD_SITUACAO',
					hidden: true
				},					
				{
					x:528,y:8,
					xtype : "textfield",
					fieldLabel: 'Situação da Conta',
					itemId : "edtDsSituacao",
					width: 110,
					name: 'DS_SITUACAO',
					readOnly: true,
					fieldStyle: 'font-weight:bold; text-align: center; background-image: none; background-color: #EEEED1',
				},
				{
					xtype : "numberfield",
					itemId : "edtCdEmpresa",
					name: 'CD_EMPRESA',
					hidden: true
				},
				{
					xtype : "numberfield",
					itemId : "edtCdPessoaPj",
					name: 'CD_PESSOA_PJ',
					hidden: true
				},
				{
					x:8,y:56, 
					fieldLabel: 'Fornecedor/Transportadora/PJ',
					itemId : "cboCdPessoaPj",
					width: 310,
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
					xtype : "numberfield",
					itemId : "edtCdPessoa",
					name: 'CD_PESSOA',
					hidden: true
				},
				{
					x:328,y:56, 
					fieldLabel: 'Pessoa',
					itemId : "cboCdPessoa",
					width: 310,
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
					xtype : "textareafield",
					fieldLabel: 'Observações',
					itemId : "edtDsObservacao",
					width: 630,
					height: 70,
			        margin: '1',					
					name: 'DS_OBSERVACAO'
				},
				{
					xtype : "numberfield",
					itemId : "edtCdPlanoConta",
					name: 'CD_PLANO_CONTA',
					hidden: true
				},
				{
					x:8,y:184, 
					fieldLabel: 'Plano de Contas',
					itemId : "cboCdPlanoConta",
					width: 300,
					xtype : "combobox",
					store: 'Generico.PlanoContaSinteticoDebitoStore',
					displayField: 'DS_PLANO_CONTA',
					valueField: 'CD_PLANO_CONTA',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'dsPlanoConta',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}	
				},
				{
					x:318,y:184,
					fieldLabel: 'Previsão',
					xtype : "datefield",
					itemId : "edtDtPrevisaoConta",
					format: 'd/m/Y',
					submitFormat: 'Y-m-d',
					width: 100,
					allowBlank: false,
					name: 'DT_PREVISAO_CONTA'
				},
				{
					x:428,y:184,
					fieldLabel: 'Vencimento',
					xtype : "datefield",
					itemId : "edtDtVencimento",
					format: 'd/m/Y',
					submitFormat: 'Y-m-d',
					width: 100,
					allowBlank: false,
					name: 'DT_VENCIMENTO'
				},
				{
					x:538,y:184,
					fieldLabel: 'Liquidação',
					xtype : "datefield",
					itemId : "edtDtLiquidacao",
					format: 'd/m/Y',
					submitFormat: 'Y-m-d',
					width: 100,
					name: 'DT_LIQUIDACAO'
				},
				{
					x:8,y:232,
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
					x:158,y:232,
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
					x:268,y:232,
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
					x:378,y:232,
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
					x:488,y:232,
					fieldLabel: 'Total da Conta',
					itemId : "edtVlLiquidacao",
					width: 150,
					xtype : "textfield",
					plugins: "textmask",
					mask: "R$ #999.999.999.990,00",
					money: true,
					name: 'VL_LIQUIDACAO',
					readOnly: true,
					fieldStyle: 'font-weight:bold; background-image: none; background-color: #FF0000',
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
		},
		{ 
			  itemId: 'btnLiquidar',
			  width: 75,
			  height: 25,
			  text: 'Liquidar',
			  iconCls: 'lock_16'
		},
		{ 
			  itemId: 'btnCancelar',
			  width: 75,
			  height: 25,
			  text: 'Cancelar',
			  iconCls: 'cancel_16'
		},
		{ 
			  itemId: 'btnDevolver',
			  width: 75,
			  height: 25,
			  text: 'Devolver',
			  iconCls: 'sort_ascending_16'
		},
		{ 
			  itemId: 'btnNegativar',
			  width: 75,
			  height: 25,
			  text: 'Negativar',
			  iconCls: 'error_16'
		},
		{ 
			  itemId: 'btnAbrir',
			  width: 75,
			  height: 25,
			  text: 'Abrir',
			  iconCls: 'edit_16'
		},
		{ 
			  itemId: 'btnSair',
			  width: 75,
			  height: 25,
			  text: 'Sair',
			  iconCls: 'door_close_16'
		}		
	]
});