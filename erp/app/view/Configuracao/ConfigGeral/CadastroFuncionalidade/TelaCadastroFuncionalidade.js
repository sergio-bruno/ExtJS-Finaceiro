Ext.define('erp.view.Configuracao.ConfigGeral.CadastroFuncionalidade.TelaCadastroFuncionalidade', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroFuncionalidade',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Funcionalidades do sistema',
	tbar: [
		{
			itemId: 'btnNovaFuncionalidade',
			text: 'Nova funcionalidade',
			tooltip: '<b>Criar uma nova funcionalidade do sistema</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarFuncionalidade',
			tooltip: '<b>Editar uma funcionalidade selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirFuncionalidade',
			tooltip: '<b>Excluir uma funcionalidade selecionada na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de funcionalidades do sistema</b>',
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
			itemId: 'panPesquisaFuncionalidade',
			layout: 'absolute',
			height: 42,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Código',
					itemId : "edtCdFuncionalidadePesquisa",
					width: 100,
					labelWidth: 40
				},
				{
					x:114,y:8,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsFuncionalidadePesquisa",
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
			xtype : "telaCadastroFuncionalidade_gridFuncionalidade",
			//title: 'Lista de funcionalidades do sistema',
			itemId: 'gridFuncionalidade',
			flex: 1
		}
	]
});