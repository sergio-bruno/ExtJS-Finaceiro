Ext.define('erp.view.Cadastro.CadastroAreaAtuacao.TelaCadastroAreaAtuacao', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroAreaAtuacao',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Área de Atuação',
	tbar: [
		{
			itemId: 'btnNovoAreaAtuacao',
			text: 'Nova Área de Atuação',
			tooltip: '<b>Criar uma nova área de atuação</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarAreaAtuacao',
			tooltip: '<b>Editar uma área de atuação selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirAreaAtuacao',
			tooltip: '<b>Excluir uma área de atuação selecionada na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de área de atuação</b>',
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
			itemId: 'panPesquisaAreaAtuacao',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsAreaAtuacaoPesquisa",
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
			xtype : "telaCadastroAreaAtuacao_gridAreaAtuacao",
			itemId: 'gridAreaAtuacao',
			flex: 1
		}	
	 ]
});