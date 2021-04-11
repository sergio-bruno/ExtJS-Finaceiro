Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioEdit', {
    extend: 'Ext.Window',
    alias: 'widget.gestaousuario-cadastrousuario-perfilusuarioedit',
	layout: 'fit',
    width: 400,  //Largura da janela
    height: 148, //Altura da janela
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
					id : "edtCdUsuario_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit",
					name: 'CD_USUARIO',
					hidden: true
				},
				{
					xtype : "numberfield",
					id : "edtCdPerfil_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit",
					name: 'CD_PERFIL',
					hidden: true
				},
				{
					x:8,y:8,
					fieldLabel: 'Selecione o perfil',
					id : "cboCdPerfil_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit",
					width: 370,
					xtype : "combobox",
					store: 'Configuracao.GestaoUsuario.CadastroUsuario.PerfilStore',
					displayField: 'DS_PERFIL',
					valueField: 'CD_PERFIL',
					pageSize: 30,
					queryDelay: 250,
					queryParam: 'dsPerfil',
					forceSelection: true,
					allowBlank: false,
					minChars: 3
				}
			]
		}
    ],
	buttons: [ 
		{ 
		  id: 'btnSalvar_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit',
		  width: 75,
		  height: 25,
		  text: 'Salvar',
		  iconCls: 'save_16'
		}
	]
});