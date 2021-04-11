Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.GridFuncionalidadePerfil', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroPerfil_gridFuncionalidadePerfil',
	border: false,

    initComponent: function(){
	
		var store = 'Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadePerfilStore';
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				//loadMask: false,
				emptyText: 'Não há registros para exibir'
			},
			tbar: [
				{
					itemId: 'btnAdicionarFuncionalidadePerfil',
					text: 'Adicionar',
					tooltip: '<b>Adicionar uma funcionalidade ao perfil</b>',
					iconCls: 'plus_16'
				},
				{
					itemId: 'btnRemoverFuncionalidadePerfil',
					text: 'Remover',
					tooltip: '<b>Remover uma funcionalidade ao perfil de acesso selecionado na lista</b>',
					iconCls: 'minus_16'
				},
				'-',
				{
					itemId: 'btnAtualizarListaFuncionalidadePerfil',
					tooltip: '<b>Atualizar a lista de funcionalidades do perfil de acesso</b>',
					iconCls: 'refresh_16'
				},
			],
			bbar: Ext.create('Ext.toolbar.Paging', {
				store: store,
				displayInfo: true,
				items: {
					itemId: 'refresh',
					style: {
						visibility: 'hidden'
					}
				}
			}),
			stripeRows: true,
			columnLines: true,
			columns: [
				{
					text   : 'Código',
					width    : 80,
					align: 'right',
					hideable: false,
					hidden: true,
					dataIndex: 'CD_PERFIL'
				},
				{
					text   : 'Código',
					width    : 80,
					align: 'right',
					hideable: false,
					hidden: true,
					dataIndex: 'CD_FUNCIONALIDADE'
				},
				{
					text   : 'Perfil',
					width    : 400,
					sortable : true,
					hideable: false,
					flex: 1,
					dataIndex: 'DS_FUNCIONALIDADE'
				}
			]
		});
			
		this.callParent(arguments);
    }
});

