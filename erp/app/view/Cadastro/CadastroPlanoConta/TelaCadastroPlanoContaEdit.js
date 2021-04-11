Ext.define('erp.view.Cadastro.CadastroPlanoConta.TelaCadastroPlanoContaEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroPlanoContaEdit',
	layout: 'fit',
    width: 540,  
    height: 180, 
    resizable: false,
	modal: true,
	title: 'Plano de Contas',
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
					itemId : "edtCdPlanoConta",
					name: 'CD_PLANO_CONTA',
					hidden: true
				},
				{
					x:8,y:8,
					fieldLabel: 'Cód. da Conta',
					xtype : "textfield",
					itemId : "edtCdConta",
					width: 100,
					allowBlank: false,
					plugins: "textmask",
					mask: "99.99.99.99",
					name: 'CD_CONTA'
				},
				{
					x:118,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição do plano de contas',
					itemId : "edtDsPlanoConta",
					width: 400,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
							this.setValue(this.getValue().toUpperCase());
						}
					},
					name: 'DS_PLANO_CONTA'
				},
				{
					xtype : "numberfield",
					itemId : "edtCdEmpresa",
					name: 'CD_EMPRESA',
					hidden: true
				},
				{
					xtype : "textfield",
					itemId : "edtTpLancamento",
					name: 'TP_LANCAMENTO',
					hidden: true
				},
				{
					x:8,y:56,
					allowBlank: false,
					fieldLabel: 'Lançamento',
					itemId : "cboTpLancamento",
					width: 100,
					xtype : "combobox",
					store : [
								['C','Crédito'],
								['D','Débito']
							],
					forceSelection: true
				},
				{
					xtype : "textfield",
					itemId : "edtTpConta",
					name: 'TP_CONTA',
					hidden: true
				},
				{
					x:118,y:56,
					allowBlank: false,
					fieldLabel: 'Tipo',
					itemId : "cboTpConta",
					width: 100,
					xtype : "combobox",
					store : [
								['A','Análitica'],
								['S','Sintética']
							],
					forceSelection: true
				},
				{					
					x:228,y:79,
					xtype : "checkbox",
					boxLabel: 'Contabiliza?',
					itemId : "ckbSnContabiliza",
					inputValue: 'S',
					uncheckedValue: 'N',
					name: 'SN_CONTABILIZA'
				},					
				{					
					x:328,y:79,
					xtype : "checkbox",
					boxLabel: 'Ativo?',
					itemId : "ckbSnAtivo",
					inputValue: 'S',
					uncheckedValue: 'N',
					name: 'SN_ATIVO'
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