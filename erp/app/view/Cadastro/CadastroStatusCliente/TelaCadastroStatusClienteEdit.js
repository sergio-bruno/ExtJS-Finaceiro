Ext.define('erp.view.Cadastro.CadastroStatusCliente.TelaCadastroStatusClienteEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroStatusClienteEdit',
	layout: 'fit',
    width: 610,  
    height: 150, 
    resizable: false,
	modal: true,
	title: 'Status do Cliente',
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
					itemId : "edtCdStatusCliente",
					name: 'CD_STATUS_CLIENTE',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição do Status do Cliente',
					itemId : "edtDsStatusCliente",
					width: 500,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
							this.setValue(this.getValue().toUpperCase());
						}
					},
					name: 'DS_STATUS_CLIENTE'
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