Ext.define('erp.view.Configuracao.ConfigGeral.CadastroFuncionalidade.GridCadastroFuncionalidade', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroFuncionalidade_gridCadastroFuncionalidade',
	border: false,

    initComponent: function(){
	
		var store = 'Configuracao.ConfigGeral.CadastroFuncionalidade.FuncionalidadeStore';
		
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
					dataIndex: 'CD_FUNCIONALIDADE'
				},
				{
					text   : 'Descrição',
					width    : 400,
					sortable : true,
					hideable: false,
					flex: 1,
					dataIndex: 'DS_FUNCIONALIDADE'
				},
				{
					text   : 'ID',
					width    : 400,
					sortable : true,
					hideable: false,
					flex: 1,
					dataIndex: 'DS_ID_FUNCIONALIDADE'
				}
			]
		});
			
		this.callParent(arguments);
    }
});

