Ext.define('erp.view.Cadastro.CadastroCliente.TelaCadastroCliente', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroCliente',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Clientes',
	tbar: [
		{
			itemId: 'btnNovoCliente',
			text: 'Novo Cliente',
			tooltip: '<b>Incluir um cliente</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarCliente',
			tooltip: '<b>Editar um cliente selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirCliente',
			tooltip: '<b>Excluir um cliente selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de clientees</b>',
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
			itemId: 'panPesquisaCliente',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Nome',
					itemId : "edtNmClientePesquisa",
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
			xtype : "telaCadastroCliente_gridCliente",
			itemId: 'gridCliente',
			flex: 1
		}	
	 ]
});