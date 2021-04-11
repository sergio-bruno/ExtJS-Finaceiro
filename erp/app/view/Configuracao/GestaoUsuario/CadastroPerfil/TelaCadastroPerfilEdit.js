Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.TelaCadastroPerfilEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroPerfilEdit',
	layout: 'fit',
    width: 400,  //Largura da janela
    height: 170, //Altura da janela
    resizable: false,
	modal: true,
	title: 'Perfil de acesso',
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
					itemId : "edtCdPerfil",
					name: 'CD_PERFIL',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsPerfil",
					width: 370,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
							this.setValue(this.getValue().toUpperCase());
						}
					},
					name: 'DS_PERFIL'
				},
				{					
					x:8,y:58,
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