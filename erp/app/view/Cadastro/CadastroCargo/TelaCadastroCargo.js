Ext.define('erp.view.Cadastro.CadastroCargo.TelaCadastroCargo', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroCargo',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Cargo',
	tbar: [
		{
			itemId: 'btnNovoCargo',
			text: 'Novo Cargo',
			tooltip: '<b>Criar um novo cargo</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarCargo',
			tooltip: '<b>Editar um cargo selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirCargo',
			tooltip: '<b>Excluir um cargo selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de cargos</b>',
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
			itemId: 'panPesquisaCargo',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsCargoPesquisa",
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
			xtype : "telaCadastroCargo_gridCargo",
			itemId: 'gridCargo',
			flex: 1
		}	
	 ]
});