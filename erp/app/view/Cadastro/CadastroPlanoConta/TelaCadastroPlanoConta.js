Ext.define('erp.view.Cadastro.CadastroPlanoConta.TelaCadastroPlanoConta', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroPlanoConta',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Plano de Contas',
	tbar: [
		{
			itemId: 'btnNovoPlanoConta',
			text: 'Novo Plano de Contas',
			tooltip: '<b>Criar um novo plano de contas</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarPlanoConta',
			tooltip: '<b>Editar um plano de contas selecionado na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirPlanoConta',
			tooltip: '<b>Excluir um plano de contas selecionado na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de plano de contas</b>',
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
			itemId: 'panPesquisaPlanoConta',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsPlanoContaPesquisa",
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
			xtype : "telaCadastroPlanoConta_gridPlanoConta",
			itemId: 'gridPlanoConta',
			flex: 1
		}	
	 ]
});