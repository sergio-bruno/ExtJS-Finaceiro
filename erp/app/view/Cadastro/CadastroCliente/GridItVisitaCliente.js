Ext.define('erp.view.Cadastro.CadastroCliente.GridItVisitaCliente', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroClienteEdit_gridItVisitaCliente',

    initComponent: function(){
		var store = 'Cadastro.CadastroCliente.VisitaClienteStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				markDirty : false,
				emptyText: 'Não há registros para exibir',
				getRowClass : function (row, index) { 
				  if (row.get('SN_ATIVO') == 'N') {
					return 'grid-inactive-row'; 
				  } 
				}
			},
			stripeRows: true,
			columnLines: true,
			columns: [
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_VISITA'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_PESSOA_PJ'
				},
				{
					text   : 'Pessoa que Realizou a Visita',
					width    : 330,
					sortable : true,
					hideable: false,
					dataIndex: 'NM_VISITANTE'
				},
				{
                    text   : 'Data da Visita',
					width    : 120,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_VISITA',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				}
			]
		});
		this.callParent(arguments);
    }
});