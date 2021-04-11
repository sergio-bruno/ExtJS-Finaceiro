Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.CadastroUsuario', {
    extend: 'Ext.Panel',
	alias: 'widget.gestaousuario-cadastrousuario-cadastrousuario',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de usuário',
	tbar: [
		{
			id: 'btnNovoUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario',
			text: 'Novo usuário',
			tooltip: '<b>Criar um novo usuário de acesso</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			id: 'btnEditarUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario',
			tooltip: '<b>Editar informações de um usuário selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		'-',
		{
			id: 'btnAlterarSenhaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario',
			text: 'Alterar senha...',
			tooltip: '<b>Alterar a senha de um usuário selecionado na lista</b>',
			iconCls: 'key_16'
		},
		'-',
		{
			id: 'btnAtualizarLista_GestaoUsuario_CadastroUsuario_CadastroUsuario',
			tooltip: '<b>Atualizar a lista de usuários</b>',
			iconCls: 'refresh_16'
		},
		'-',
		{
			id: 'btnFiltroPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario',
			tooltip: '<b>Habilitar/desabilitar o filtro de pesquisa</b>',
			iconCls: 'filter_16'
		}
	],
	items: [
		{
			xtype: 'panel',
			id: 'panPesquisaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario',
			layout: 'absolute',
			height: 42,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Login',
					id : "edtNmLoginPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario",
					width: 160,
					labelWidth: 30
				},
				/*{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Login',
					id : "edtNmLoginPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario",
					width: 160,
					labelWidth: 30
				},*/
				{
					x:176,y:8,
					xtype : "numberfield",
					fieldLabel: 'Matrícula',
					id : "edtNrMatriculaPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario",
					width: 140,
					labelWidth: 46,
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false,
					allowDecimals: false
				},
				{
					x:324,y:8,
					xtype : "textfield",
					fieldLabel: 'Nome',
					id : "edtNmUsuarioPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario",
					width: 350,
					labelWidth: 30
				},
				{ 
					x:682,y:8,
					xtype: 'button',
					id: 'btnPesquisarPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario',
					width: 100,
					//height: 25,
					text: 'Pesquisar',
					iconCls: 'search_16'
				},
				{ 
					x:790,y:8,
					xtype: 'button',
					id: 'btnLimparPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario',
					width: 75,
					//height: 25,
					text: 'Limpar',
					iconCls: 'cleanup_16'
				}
			]
		},
		{
			xtype: 'panel',
			layout: {
				type: 'hbox',
				align : 'stretch',
				pack  : 'start'
			},
			flex: 1,
			items: [
				{
					xtype : "gestaousuario-cadastrousuario-gridusuario",
					title: 'Lista de usuários',
					id: 'gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario',
					flex: 1,					
					border: true
				},
				{
					xtype: 'tabpanel',
					width: 400,
					border: false,
					items: [
						{
							xtype : "gestaousuario-cadastrousuario-gridperfilusuario",
							title: 'Perfis do usuário',
							id: 'gridPerfilUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario',
							flex: 1,					
							border: true
						}
					]
				}
			]
		}
	]
});