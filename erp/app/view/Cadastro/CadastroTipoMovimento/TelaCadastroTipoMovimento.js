Ext.define('erp.view.Cadastro.CadastroTipoMovimento.TelaCadastroTipoMovimento', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroTipoMovimento',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Tipos de Movimento',
	tbar: [
		{
			itemId: 'btnNovoTipoMovimento',
			text: 'Novo Tipo de Movimento',
			tooltip: '<b>Criar um novo Tipo de Movimento</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarTipoMovimento',
			tooltip: '<b>Editar um Tipo de Movimento selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirTipoMovimento',
			tooltip: '<b>Excluir um Tipo de Movimento selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de Tipos de Movimento</b>',
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
			itemId: 'panPesquisaTipoMovimento',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsTipoMovimentoPesquisa",
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
			xtype : "telaCadastroTipoMovimento_gridTipoMovimento",
			//title: 'Lista de perfis de acesso',
			itemId: 'gridTipoMovimento',
			flex: 1
		}	
	 ]
});