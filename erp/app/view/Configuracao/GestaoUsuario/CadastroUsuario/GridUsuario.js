Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.GridUsuario', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.gestaousuario-cadastrousuario-gridusuario',
	border: false,

    initComponent: function(){

		var store = 'Configuracao.GestaoUsuario.CadastroUsuario.UsuarioStore';
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				loadMask: false,
				emptyText: 'Não há registros para exibir',
				getRowClass : function (row, index) { 
				  if (row.get('SN_ATIVO') == 'N') {
					return 'grid-inactive-row'; //Pinta a linha se o registro estiver inativo
				  } 
				}
			},
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
					text   : 'Login',
					width    : 150,
					sortable : true,
					hideable: false,
					dataIndex: 'NM_LOGIN'
				},
				
				{
					text   : 'E-mail',
					width    : 150,
					sortable : true,
					hideable: false,
					flex: 1,
					dataIndex: 'DS_EMAIL'
				},
				{
					text   : 'Ativo',
					width    : 80,
					sortable : true,
					hideable: false,
					dataIndex: 'SN_ATIVO',
				}
			]
		});
			
		this.callParent(arguments);
    }
});

