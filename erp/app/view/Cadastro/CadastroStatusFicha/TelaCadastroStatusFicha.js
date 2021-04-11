Ext.define('erp.view.Cadastro.CadastroStatusFicha.TelaCadastroStatusFicha', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroStatusFicha',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Status da Ficha Cadastral',
	tbar: [
		{
			itemId: 'btnNovoStatusFicha',
			text: 'Novo Status da Ficha Cadastral',
			tooltip: '<b>Criar um novo status para a ficha cadastral</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarStatusFicha',
			tooltip: '<b>Editar um status de ficha cadastral selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirStatusFicha',
			tooltip: '<b>Excluir um status de ficha cadastral selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de status de ficha cadastral</b>',
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
			itemId: 'panPesquisaStatusFicha',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsStatusFichaPesquisa",
					width: 395,
					labelWidth: 50
				},			
				{ 
					x:415,y:18, 
					xtype: 'button',
					itemId: 'btnPesquisarPesquisa',
					width: 100,
					text: 'Pesquisar',
					iconCls: 'search_16'
				},
				{ 
					x:520,y:18, 
					xtype: 'button',
					itemId: 'btnLimparPesquisa',
					width: 75,
					text: 'Limpar',
					iconCls: 'cleanup_16'
				}
			]
		},
		{
			xtype : "telaCadastroStatusFicha_gridStatusFicha",
			itemId: 'gridStatusFicha',
			flex: 1
		}	
	 ]
});