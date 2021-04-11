Ext.define('erp.view.Cadastro.CadastroRedeSocial.TelaCadastroRedeSocial', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroRedeSocial',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Redes Sociais',
	tbar: [
		{
			itemId: 'btnNovoRedeSocial',
			text: 'Nova Rede Social',
			tooltip: '<b>Cadastrar uma nova rede social</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarRedeSocial',
			tooltip: '<b>Editar uma rede social selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirRedeSocial',
			tooltip: '<b>Excluir uma rede social selecionada na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de redes sociais</b>',
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
			itemId: 'panPesquisaRedeSocial',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsRedeSocialPesquisa",
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
			xtype : "telaCadastroRedeSocial_gridRedeSocial",
			//title: 'Lista de perfis de acesso',
			itemId: 'gridRedeSocial',
			flex: 1
		}	
	 ]
});