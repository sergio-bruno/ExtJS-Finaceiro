Ext.define('erp.view.Configuracao.ConfigGeral.CadastroFuncionalidade.TelaCadastroFuncionalidadeEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroFuncionalidadeEdit',
	layout: 'fit',
    width: 430,  //Largura da janela
    height: 212, //Altura da janela
    resizable: false,
	modal: true,
	title: 'Funcionalidade de acesso',
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
					itemId : "edtCdFuncionalidade",
					name: 'CD_FUNCIONALIDADE',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsFuncionalidade",
					width: 400,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
							this.setValue(this.getValue().toUpperCase());
						}
					},
					name: 'DS_FUNCIONALIDADE'
				},
				{
					x:8,y:56,
					xtype : "textfield",
					fieldLabel: 'ID',
					itemId : "edtDsIdFuncionalidade",
					width: 400,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
						}
					},
					name: 'DS_ID_FUNCIONALIDADE'
				},
				{					
					x:8,y:108,
					xtype : "checkbox",
					boxLabel: 'Ativo',
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