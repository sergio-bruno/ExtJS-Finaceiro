Ext.define('erp.view.Cadastro.CadastroPessoa.TelaCadastroPessoa', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroPessoa',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Pessoas',
	tbar: [
		{
			itemId: 'btnNovoPessoa',
			text: 'Nova Pessoa',
			tooltip: '<b>Incluir uma pessoa</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarPessoa',
			tooltip: '<b>Editar uma passoa selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirPessoa',
			tooltip: '<b>Excluir uma pessoa selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de pessoa</b>',
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
			itemId: 'panPesquisaPessoa',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Nome',
					itemId : "edtNmPessoaPesquisa",
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
			xtype : "telaCadastroPessoa_gridPessoa",
			//title: 'Lista de perfis de acesso',
			itemId: 'gridPessoa',
			flex: 1
		}	
	 ]
});