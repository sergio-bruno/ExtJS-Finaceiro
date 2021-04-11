Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.GridPerfilUsuario', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.gestaousuario-cadastrousuario-gridperfilusuario',
	border: false,

    initComponent: function(){
	
		var store = 'Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioStore';
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				//loadMask: false,
				emptyText: 'Não há registros para exibir'
			},
			tbar: [
				{
					id: 'btnAdicionarPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario',
					text: 'Adicionar',
					tooltip: '<b>Adicionar um perfil de acesso à lista de perfis do usuário</b>',
					iconCls: 'plus_16'
				},
				{
					id: 'btnRemoverPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario',
					text: 'Remover',
					tooltip: '<b>Remover um perfil de acesso selecionado na lista</b>',
					iconCls: 'minus_16'
				},
				'-',
				{
					id: 'btnAtualizarLista_GestaoUsuario_CadastroUsuario_GridPerfilUsuario',
					tooltip: '<b>Atualizar a lista de perfis de acesso</b>',
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
					dataIndex: 'CD_USUARIO'
				},
				{
					text   : 'Código',
					width    : 80,
					align: 'right',
					hideable: false,
					hidden: true,
					dataIndex: 'CD_PERFIL'
				},
				{
					text   : 'Perfil',
					width    : 400,
					sortable : true,
					hideable: false,
					flex: 1,
					dataIndex: 'DS_PERFIL'
				}
			]
		});
			
		this.callParent(arguments);
    }
});

