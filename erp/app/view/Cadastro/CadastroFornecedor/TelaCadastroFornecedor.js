Ext.define('erp.view.Cadastro.CadastroFornecedor.TelaCadastroFornecedor', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroFornecedor',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Fornecedores',
	tbar: [
		{
			itemId: 'btnNovoFornecedor',
			text: 'Novo Fornecedor',
			tooltip: '<b>Incluir um fornecedor</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarFornecedor',
			tooltip: '<b>Editar um fornecedor selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirFornecedor',
			tooltip: '<b>Excluir um fornecedor selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de fornecedores</b>',
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
			itemId: 'panPesquisaFornecedor',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Nome',
					itemId : "edtNmFornecedorPesquisa",
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
			xtype : "telaCadastroFornecedor_gridFornecedor",
			itemId: 'gridFornecedor',
			flex: 1
		}	
	 ]
});