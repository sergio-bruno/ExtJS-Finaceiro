Ext.define('erp.view.Cadastro.CadastroStatusCliente.TelaCadastroStatusCliente', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroStatusCliente',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Status do Cliente',
	tbar: [
		{
			itemId: 'btnNovoStatusCliente',
			text: 'Novo Status do Cliente',
			tooltip: '<b>Criar um novo status para o cliente</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarStatusCliente',
			tooltip: '<b>Editar um status de cliente selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirStatusCliente',
			tooltip: '<b>Excluir um status de cliente selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de status do cliente</b>',
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
			itemId: 'panPesquisaStatusCliente',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsStatusClientePesquisa",
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
			xtype : "telaCadastroStatusCliente_gridStatusCliente",
			itemId: 'gridStatusCliente',
			flex: 1
		}	
	 ]
});