Ext.define('erp.view.Cadastro.CadastroEspecialidade.TelaCadastroEspecialidade', {
    extend: 'Ext.Panel',
	alias: 'widget.telaCadastroEspecialidade',
	layout: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Cadastro de Especialidade',
	tbar: [
		{
			itemId: 'btnNovoEspecialidade',
			text: 'Nova Especialidade',
			tooltip: '<b>Criar uma nova especialidade</b>',
			iconCls: 'new_16'
		},
		'-',
		{
			itemId: 'btnEditarEspecialidade',
			tooltip: '<b>Editar uma especialidade selecionada na lista</b>',
			iconCls: 'edit_16'
		},
		{
			itemId: 'btnExcluirEspecialidade',
			tooltip: '<b>Excluir uma especialidade selecionada na lista</b>',
			iconCls: 'delete_16'
		},
		'-',
		{
			itemId: 'btnAtualizarLista',
			tooltip: '<b>Atualizar a lista de especialidades</b>',
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
			itemId: 'panPesquisaEspecialidade',
			layout: 'absolute',
			height: 62,
			border: false,
			hidden: true,
			items: [
				{
					x:8,y:18,
					xtype : "textfield",
					fieldLabel: 'Descrição',
					itemId : "edtDsEspecialidadePesquisa",
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
			xtype : "telaCadastroEspecialidade_gridEspecialidade",
			itemId: 'gridEspecialidade',
			flex: 1
		}	
	 ]
});