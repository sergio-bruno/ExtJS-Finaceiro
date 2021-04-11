Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.CadastroUsuarioEdit', {
    extend: 'Ext.Window',
    alias: 'widget.gestaousuario-cadastrousuario-cadastrousuarioedit',
	layout: 'fit',
    width: 450,  //Largura da janela
    height: 300, //Altura da janela
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
					id : "edtCdUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
					name: 'CD_USUARIO',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Login',
					id : "edtNmLogin_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
					width: 140,
					labelWidth: 30,
					allowBlank: false,
					name: 'NM_LOGIN'
				},
				{
					x:156,y:8,
					xtype : "textfield",
					fieldLabel: 'E-mail',
					id : "edtDsEmail_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
					width: 270,
					labelWidth: 30,
					allowBlank: false,
					vtype: 'email',
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
						},
						change: function(){
							this.setValue(this.getValue().toLowerCase());
						}
					},
					name: 'DS_EMAIL'
				},
				{
					x:8,y:56,
					xtype: 'fieldset',
					id: 'fdsTpNivelAcesso_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit',
					title: '<b>Nível de acesso</b>',
					layout: 'absolute',
					width: 270,
					height: 46,
					disabled: true,
					defaults: {
						labelAlign: 'top',
						labelSeparator: ''
					},
					items : [
						{
							xtype: 'radiogroup',
							id : "rdgTpNivelAcesso_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
							x:4, y:4,
							width: 230,
							columns: 2,
							items : [
								{					
									boxLabel: 'Administrador',
									name: 'radioTpNivelAcesso',
									inputValue: 'A'
								},
								{					
									boxLabel: 'Usuário Padrão',
									name: 'radioTpNivelAcesso',
									inputValue: 'U'
								}
							]
						}
					]
				},
				{					
					x:295,y:76,
					xtype : "checkbox",
					boxLabel: 'Ativo?',
					id : "ckbSnAtivo_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
					inputValue: 'S',
					uncheckedValue: 'N',
					name: 'SN_ATIVO'
				},					
				{
					x:8,y:104,
					xtype: 'fieldset',
					id: 'fdsSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit',
					title: '<b>Senha de acesso</b>',
					layout: 'absolute',
					width: 420,
					height: 108,
					defaults: {
						labelAlign: 'top',
						labelSeparator: ''
					},
					items : [
						{
							x:4,y:4,
							fieldLabel: 'Senha',
							id : "edtDsSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
							width: 190,
							//labelWidth: 32,
							xtype : "textfield",
							inputType: 'password',
							allowBlank: false,
							vtype: 'password',
							name: 'DS_SENHA'
						},
						{
							x:202,y:4,
							fieldLabel: 'Confirmação da senha',
							id : "edtDsConfirmacaoSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
							width: 190,
							//labelWidth: 114,
							xtype : "textfield",
							inputType: 'password',
							allowBlank: false,
							vtype: 'password'
						},
						{					
							x:4,y:56,
							xtype : "checkbox",
							boxLabel: 'O usuário deverá alterar a senha no próximo logon',
							id : "ckbSnAlteraSenhaProxLogon_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit",
							inputValue: 'S',
							uncheckedValue: 'N',
							name: 'SN_ALTERA_SENHA_PROX_LOGON'
						}
					]
				}
			]
		}
    ],
	buttons: [ 
		{ 
		  id: 'btnSalvar_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit',
		  width: 75,
		  height: 25,
		  text: 'Salvar',
		  iconCls: 'save_16'
		}
	]
});