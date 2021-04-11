Ext.define('erp.view.Movimento.MovimentoFichaServico.TelaMovimentoFichaServico', {
    extend: 'Ext.Panel',
	alias: 'widget.telaMovimentoFichaServico',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Ficha de Serviços',
	tbar: [
		{
			itemId: 'btnNovoFichaServico',
			text: 'Nova Ficha de Serviço',
			tooltip: '<b>Incluir uma ficha de serviço</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarFichaServico',
			tooltip: '<b>Editar uma ficha de serviço selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirFichaServico',
			tooltip: '<b>Excluir uma ficha de serviço selecionada na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de fichas de serviço</b>',
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
			itemId: 'panPesquisaFichaServico',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Cliente',
					itemId : "edtNmRazaoClienteFichaServicoPesquisa",
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
			xtype : "telaMovimentoFichaServico_gridFichaServico",
			itemId: 'gridFichaServico',
			flex: 1
		}	
	 ]
});