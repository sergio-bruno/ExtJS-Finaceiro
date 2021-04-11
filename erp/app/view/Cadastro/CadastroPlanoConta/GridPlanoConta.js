Ext.define('erp.view.Cadastro.CadastroPlanoConta.GridPlanoConta', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroPlanoConta_gridPlanoConta',
	border: false,

    initComponent: function(){

		function renderSn(val, metaData, record, rowIndex, colIndex, store) {
			if (val == 'S') {
				val = 'Sim';
			} else if (val == 'N') {
				val = 'Não';
			}
			return val;
		};
	
		function renderLancamento(val, metaData, record, rowIndex, colIndex, store) {
			if (val == 'C') {
				val = 'Crédito';
			} else if (val == 'D') {
				val = 'Débito';
			}
			return val;
		};
		
		function renderTpConta(val, metaData, record, rowIndex, colIndex, store) {
			if (val == 'A') {
				val = 'Análitica';
			} else if (val == 'S') {
				val = 'Sintética';
			}
			return val;
		};

		var store = 'Cadastro.CadastroPlanoConta.PlanoContaStore'; 
		
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
					hideable: true,
					hidden: true,
					dataIndex: 'CD_PLANO_CONTA'
				},
				{
					text   : 'Cód. da Conta',
					width    : 100,
					sortable : true,
					hideable: false,
					dataIndex: 'CD_CONTA'
				},
				{
					text   : 'Descrição',
					width    : 200,
					sortable : true,
					hideable: false,
					flex: 1,
					dataIndex: 'DS_PLANO_CONTA'
				},
				{
					text   : 'Lançamento',
					width    : 170,
					sortable : true,
					hideable: false,
					dataIndex: 'TP_LANCAMENTO',
					renderer: renderLancamento
				},
				{
					text   : 'Tipo da Conta',
					width    : 170,
					sortable : true,
					hideable: false,
					dataIndex: 'TP_CONTA',
					renderer: renderTpConta
				},
				{
					text   : 'Contabiliza?',
					width    : 170,
					sortable : true,
					hideable: false,
					dataIndex: 'SN_CONTABILIZA',
					renderer: renderSn
				},
				{
					text   : 'Ativo',
					width    : 200,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'SN_ATIVO',
					renderer: renderSn
				}
			]
		});
			
		this.callParent(arguments);
    }
});

