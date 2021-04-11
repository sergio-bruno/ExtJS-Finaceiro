Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.TelaCadastroPerfil', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroPerfil',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Perfis de acesso',
	tbar: [
		{
			itemId: 'btnNovoPerfil',
			text: 'Novo perfil de acesso',
			tooltip: '<b>Criar um novo perfil de acesso</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarPerfil',
			tooltip: '<b>Editar um perfil de acesso selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirPerfil',
			tooltip: '<b>Excluir um perfil de acesso selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de perfis de acesso</b>',
			iconCls: 'refresh_16'
		},
		'-',
		{
			itemId: 'btnFiltroPesquisa',
			tooltip: '<b>Habilitar/desabilitar o filtro de pesquisa</b>',
			iconCls: 'filter_16'
		}
	],
	items: [
		{
			xtype: 'panel',
			itemId: 'panPesquisaPerfil',
			layout: 'absolute',
			height: 42,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Código',
					itemId : "edtCdPerfilPesquisa",
					width: 100,
					labelWidth: 40
				},
				{
					x:114,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsPerfilPesquisa",
					width: 350,
					labelWidth: 50
				},
				{ 
					x:472,y:8,
					xtype: 'button',
					itemId: 'btnPesquisarPesquisa',
					width: 100,
					//height: 25,
					text: 'Pesquisar',
					iconCls: 'search_16'
				},
				{ 
					x:580,y:8,
					xtype: 'button',
					itemId: 'btnLimparPesquisa',
					width: 75,
					//height: 25,
					text: 'Limpar',
					iconCls: 'cleanup_16'
				}
			]
		},
		{
			xtype: 'panel',
			itemId: 'panFuncionalidadePerfil',
			layout: {
				type: 'hbox',
				align : 'stretch',
				pack  : 'start'
			},
			flex: 1,
			items: [
				{
					xtype : "telaCadastroPerfil_gridPerfil",
					title: 'Lista de perfis de acesso',
					itemId: 'gridPerfil',
					flex: 1,					
					border: true
				},
				{
					xtype: 'tabpanel',
					width: 400,
					border: false,
					items: [
						{
							xtype : "telaCadastroPerfil_gridFuncionalidadePerfil",
							title: 'Funcionalidades do perfil',
							itemId: 'gridFuncionalidadePerfil',
							flex: 1,					
							border: true
						}
					]
				}
			]
		}
	]
});