Ext.define('erp.view.Cadastro.CadastroTipoConselho.TelaCadastroTipoConselho', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroTipoConselho',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Tipos de Conselho',
	tbar: [
		{
			itemId: 'btnNovoTipoConselho',
			text: 'Novo Tipo de Conselho',
			tooltip: '<b>Criar um novo Tipo de Conselho</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarTipoConselho',
			tooltip: '<b>Editar um Tipo de Conselho selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirTipoConselho',
			tooltip: '<b>Excluir um Tipo de Conselho selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de Tipos de Conselho</b>',
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
			itemId: 'panPesquisaTipoConselho',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsTipoConselhoPesquisa",
					width: 395,
					labelWidth: 50
				},			
				{ 
					x:415,y:18, //x:472,y:8, 
					xtype: 'button',
					itemId: 'btnPesquisarPesquisa',
					width: 100,
					//height: 25,
					text: 'Pesquisar',
					iconCls: 'search_16'
				},
				{ 
					x:520,y:18, //x:580,y:8,
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
			xtype : "telaCadastroTipoConselho_gridTipoConselho",
			//title: 'Lista de perfis de acesso',
			itemId: 'gridTipoConselho',
			flex: 1
		}	
	 ]
});