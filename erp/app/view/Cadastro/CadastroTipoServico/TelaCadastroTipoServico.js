Ext.define('erp.view.Cadastro.CadastroTipoServico.TelaCadastroTipoServico', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroTipoServico',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Tipos de Serviço',
	tbar: [
		{
			itemId: 'btnNovoTipoServico',
			text: 'Novo Tipo de Serviço',
			tooltip: '<b>Criar um novo Tipo de Serviço</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarTipoServico',
			tooltip: '<b>Editar um Tipo de Serviço selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirTipoServico',
			tooltip: '<b>Excluir um Tipo de Serviço selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de Tipos de Serviço</b>',
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
			itemId: 'panPesquisaTipoServico',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsTipoServicoPesquisa",
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
			xtype : "telaCadastroTipoServico_gridTipoServico",
			itemId: 'gridTipoServico',
			flex: 1
		}	
	 ]
});