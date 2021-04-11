Ext.define('erp.view.Cadastro.CadastroClassificacao.TelaCadastroClassificacao', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroClassificacao',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Classificação Empresarial',
	tbar: [
		{
			itemId: 'btnNovoClassificacao',
			text: 'Nova Classificação Empresaria',
			tooltip: '<b>Criar uma nova classificação empresarial</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarClassificacao',
			tooltip: '<b>Editar uma classificação empresarial selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirClassificacao',
			tooltip: '<b>Excluir uma classificação empresarial selecionada na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de classificação empresarial</b>',
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
			itemId: 'panPesquisaClassificacao',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsClassificacaoPesquisa",
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
			xtype : "telaCadastroClassificacao_gridClassificacao",
			itemId: 'gridClassificacao',
			flex: 1
		}	
	 ]
});