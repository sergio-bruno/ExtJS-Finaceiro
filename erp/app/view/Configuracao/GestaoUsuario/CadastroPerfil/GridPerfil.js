Ext.define('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.GridPerfil', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroPerfil_gridPerfil',
	border: false,

    initComponent: function(){
	
		var store = 'Configuracao.GestaoUsuario.CadastroPerfil.PerfilStore';
		
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
					hidden : true,
					width    : 80,
					align: 'right',
					hideable: false,
					dataIndex: 'CD_PERFIL'
				},
				{
					text   : 'Descrição',
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

