Ext.define('erp.view.Cadastro.CadastroSetor.TelaCadastroSetor', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroSetor',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Ministérios',
	tbar: [
		{
			itemId: 'btnNovoSetor',
			text: 'Novo Ministérios',
			tooltip: '<b>Criar um novo Ministério</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarSetor',
			tooltip: '<b>Editar um Ministério selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirSetor',
			tooltip: '<b>Excluir um Ministério selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de Ministérios</b>',
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
			itemId: 'panPesquisaSetor',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsSetorPesquisa",
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
			xtype : "telaCadastroSetor_gridSetor",
			//title: 'Lista de perfis de acesso',
			itemId: 'gridSetor',
			flex: 1
		}	
	 ]
});