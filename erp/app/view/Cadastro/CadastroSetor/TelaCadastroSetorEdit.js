Ext.define('erp.view.Cadastro.CadastroSetor.TelaCadastroSetorEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroSetorEdit',
	layout: 'fit',
    width: 610,  
    height: 150, 
    resizable: false,
	modal: true,
	title: 'Ministério',
	editMode: false,
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
					itemId : "edtCdSetor",
					name: 'CD_SETOR',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição do Ministério',
					itemId : "edtDsSetor",
					width: 500,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
						},
						change: function(){
							this.setValue(this.getValue().toUpperCase());
						}
					},
					name: 'DS_SETOR'
				},
				{					
					x:523,y:30,
					xtype : "checkbox",
					boxLabel: 'Ativo',
					itemId : "ckbSnAtivo",
					inputValue: 'S',
					uncheckedValue: 'N',
					name: 'SN_ATIVO',
					//hidden: true
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