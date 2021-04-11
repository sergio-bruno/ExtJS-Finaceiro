Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.TrocaSenhaUsuarioEdit', {
    extend: 'Ext.Window',
    alias: 'widget.gestaousuario-cadastrousuario-trocasenhausuarioedit',
	layout: 'fit',
    width: 450,  //Largura da janela
    height: 195, //Altura da janela
    resizable: false,
	modal: true,
	title: 'Usuário',
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
					id : "edtCdUsuario_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit",
					name: 'CD_USUARIO',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Login',
					id : "edtNmLogin_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit",
					width: 205,
					labelWidth: 30,
					readOnly: true,
					name: 'NM_LOGIN'
				},
				{
					x:223,y:8,
					xtype : "textfield",
					fieldLabel: 'Senha atual',
					id : "edtSenhaAtual_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit",
					width: 205,
					labelWidth: 30,
					inputType: 'password',
					allowBlank: false,
					name: 'DS_SENHA_ATUAL'
				},
				{
					x:8,y:56,
					xtype: 'fieldset',
					id: 'fdsSenha_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit',
					title: '<b>Digite a nova senha de acesso</b>',
					layout: 'absolute',
					width: 420,
					height: 68,
					defaults: {
						labelAlign: 'top',
						labelSeparator: ''
					},
					items : [
						{
							x:4,y:4,
							fieldLabel: 'Senha',
							id : "edtDsSenha_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit",
							width: 190,
							xtype : "textfield",
							inputType: 'password',
							allowBlank: false,
							vtype: 'password',
							name: 'DS_SENHA'
						},
						{
							x:202,y:4,
							fieldLabel: 'Confirmação da senha',
							id : "edtDsConfirmacaoSenha_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit",
							width: 190,
							xtype : "textfield",
							inputType: 'password',
							allowBlank: false,
							vtype: 'password'
						}
					]
				}
			]
		}
    ],
	buttons: [ 
		{ 
		  id: 'btnSalvar_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit',
		  width: 75,
		  height: 25,
		  text: 'Salvar',
		  iconCls: 'save_16'
		}
	]
});