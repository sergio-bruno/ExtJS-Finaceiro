Ext.define('erp.view.Cadastro.CadastroCliente.GridCliente', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroCliente_gridCliente',
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

		var store = 'Cadastro.CadastroCliente.ClienteStore'; 
		
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
					text   : 'Razão Social',
					//hidden: true,
					width    : 200,
					sortable : true,
					hideable: false,
					flex: 2,
					dataIndex: 'NM_RAZAO_SOCIAL'
				},
				{
					text   : 'Nome de Fantasia',
					hidden: true,
					width    : 200,
					sortable : true,
					hideable: false,
					flex: 2,
					dataIndex: 'NM_FANTASIA'
				},
				{
					text   : 'Classificação Empresarial',
					width    : 140,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'DS_CLASSIFICACAO'
				},
				{
					text   : 'Área de Atuação',
					width    : 140,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'DS_AREA_ATUACAO'
				},
				{
					text   : 'Status do Cliente',
					width    : 140,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'DS_STATUS_CLIENTE'
				},
				{
					text   : 'Status da Ficha',
					width    : 140,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'DS_STATUS_FICHA'
				},
				{
					text   : 'Fundação',
					hidden: true,
					width    : 100,
					align: 'center',
					sortable : true,
					dataIndex: 'DT_FUNDACAO',
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text   : 'CPF',
					hidden: true,
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
					hidden: true,
					width    : 130,
					sortable : true,
					hideable: false,
					//flex: 2,
					dataIndex: 'NR_IE'
				},
				{
					text   : 'Insc. Municipal',
					hidden: true,
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

