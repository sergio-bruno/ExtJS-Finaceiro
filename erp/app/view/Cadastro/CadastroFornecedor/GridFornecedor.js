Ext.define('erp.view.Cadastro.CadastroFornecedor.GridFornecedor', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroFornecedor_gridFornecedor',
	border: false,

    initComponent: function(){
	
		function renderSnAtivo(val, metaData, record, rowIndex, colIndex, store) {
			if (val == 'S') {
				val = 'Sim';
			} else if (val == 'N') {
				val = 'Não';
			}
			return val;
		};

        function renderNrCpf(val, metaData, record, rowIndex, colIndex, store) {
			if (val != null) {
				val = val.substr(0,3) + '.' + val.substr(3,3) + '.' + val.substr(6,3) + '-' + val.substr(9,2);
			}
			return val;
		};
		
		function renderNrCnpj(val, metaData, record, rowIndex, colIndex, store) {
			if (val != null) {
				val = val.substr(0,2) + '.' + val.substr(2,3) + '.' + val.substr(5,3) + '/' + val.substr(8,4) + '-' + val.substr(12,2);
			}
			return val;
		};

		var store = 'Cadastro.CadastroFornecedor.FornecedorStore'; 
		
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
					dataIndex: 'CD_PESSOA_PJ'
				},
				{
					text   : 'Nome de Fantasia',
					width    : 200,
					sortable : true,
					hideable: false,
					flex: 2,
					dataIndex: 'NM_FANTASIA'
				},
				{
					text   : 'Razão Social',
					width    : 200,
					sortable : true,
					hideable: false,
					flex: 2,
					dataIndex: 'NM_RAZAO_SOCIAL'
				},
				{
                   text   : 'Fundação',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_FUNDACAO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'CPF',
					width    : 130,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'NR_CPF',
					renderer: renderNrCpf
				},
				{
					text   : 'CNPJ',
					width    : 130,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'NR_CNPJ',
					renderer: renderNrCnpj
				},
				{
					text   : 'Insc. Estadual',
					width    : 130,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'NR_IE'
				},
				{
					text   : 'Insc. Municipal',
					width    : 130,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'NR_IM'
				},
				{
					text   : 'Ativo',
					hidden: true,
					width    : 70,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'SN_ATIVO',
					renderer: renderSnAtivo
				}
			]
		});
			
		this.callParent(arguments);
    }
});

