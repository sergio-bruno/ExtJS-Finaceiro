Ext.define('erp.view.Cadastro.CadastroTipoMovimento.TelaCadastroTipoMovimentoEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroTipoMovimentoEdit',
	layout: 'fit',
    width: 610,  
    height: 150, 
    resizable: false,
	modal: true,
	title: 'Tipo de Movimento',
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
					itemId : "edtCdTipoMovimento",
					name: 'CD_TIPO_MOVIMENTO',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição do Tipo de Movimento',
					itemId : "edtDsTipoMovimento",
					width: 500,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
							this.setValue(this.getValue().toUpperCase());
						}
					},
					name: 'DS_TIPO_MOVIMENTO'
				},
				{
					xtype : "numberfield",
					itemId : "edtCdEmpresa",
					name: 'CD_EMPRESA',
					hidden: true
				},
				{					
					x:523,y:30,
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