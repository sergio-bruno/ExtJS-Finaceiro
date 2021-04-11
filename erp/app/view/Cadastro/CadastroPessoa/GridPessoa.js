Ext.define('erp.view.Cadastro.CadastroPessoa.GridPessoa', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroPessoa_gridPessoa',
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
		
		var store = 'Cadastro.CadastroPessoa.PessoaStore'; 
		
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
					dataIndex: 'CD_PESSOA'
				},
				{
					text   : 'Nome',
					width    : 200,
					sortable : true,
					hideable: false,
					flex: 2,
					dataIndex: 'NM_PESSOA'
				},
				{
                   text   : 'Nascimento',
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_NASCIMENTO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'CPF',
					width    : 130,
					sortable : true,
					hidden: true,
					hideable: false,
					//flex: 2,
					dataIndex: 'NR_CPF',
					renderer: renderNrCpf
				},
				{
					text   : 'Ativo',
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

