Ext.define('erp.view.Cadastro.CadastroTipoContato.TelaCadastroTipoContato', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroTipoContato',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Tipos de Contato',
	tbar: [
		{
			itemId: 'btnNovoTipoContato',
			text: 'Novo Tipo de Contato',
			tooltip: '<b>Criar um novo Tipo de Contato</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarTipoContato',
			tooltip: '<b>Editar um Tipo de Contato selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirTipoContato',
			tooltip: '<b>Excluir um Tipo de Contato selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de Tipos de Contato</b>',
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
			itemId: 'panPesquisaTipoContato',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsTipoContatoPesquisa",
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
			xtype : "telaCadastroTipoContato_gridTipoContato",
			//title: 'Lista de perfis de acesso',
			itemId: 'gridTipoContato',
			flex: 1
		}	
	 ]
});