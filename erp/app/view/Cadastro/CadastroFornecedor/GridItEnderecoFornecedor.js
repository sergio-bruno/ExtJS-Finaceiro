Ext.define('erp.view.Cadastro.CadastroFornecedor.GridItEnderecoFornecedor', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroFornecedorEdit_gridItEnderecoFornecedor',
	//border: false,

    initComponent: function(){
		
		function renderSnAtivo(val, metaData, record, rowIndex, colIndex, store) {
			if (val == 'S') {
				val = 'Sim';
			} else if (val == 'N') {
				val = 'Não';
			}
			return val;
		};

        function renderNrCep(val, metaData, record, rowIndex, colIndex, store) {
			if (val != null) {
				val = val.substr(0,5) + '-' + val.substr(5,3);
			}
			return val;
		};
		
		var store = 'Cadastro.CadastroFornecedor.EnderecoFornecedorStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
				//loadMask: false,
				markDirty : false,
				emptyText: 'Não há registros para exibir',
				getRowClass : function (row, index) { 
				  if (row.get('SN_ATIVO') == 'N') {
					return 'grid-inactive-row'; //Pinta a linha se o registro estiver inativo
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
					dataIndex: 'CD_ENDERECO'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_PESSOA_PJ'
				},
				{
					text   : 'Cód. Tp. Logr.',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_TIPO_LOGRADOURO'
				},
				{
					text   : 'Tp. Logr. Abrev',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'DS_TIPO_LOGRADOURO_ABREV'
				},
				{
					text   : 'Tp. Logr.',
					width    : 100,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_TIPO_LOGRADOURO'
				},
				{
					text   : 'Logradouro',
					width    : 330,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_LOGRADOURO'
				},
				{
					text   : 'Número',
					width    : 70,
					sortable : true,
					hideable: false,
					dataIndex: 'NR_ENDERECO'
				},
				{
					text   : 'Complemento',
					width    : 150,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_COMPLEMENTO'
				},
				{
					text   : 'Bairro',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'NM_BAIRRO'
				},
				{
					text   : 'Cód. Cidade',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_CIDADE'
				},
				{
					text   : 'Município',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_CIDADE'
				},
				{
					text   : 'IBGE',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_IBGE'
				},
				{
					text   : 'UF',
					width    : 30,
					sortable : true,
					hideable: false,
					dataIndex: 'CD_UF'
				},
				{
					text   : 'CEP',
					width    : 90,
					sortable : true,
					hideable: false,
					dataIndex: 'NR_CEP',
					renderer: renderNrCep
				},
				
				{
					text   : 'Tp. Enderecço',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_TIPO_ENDERECO'
				},
				{
					text   : 'Tipo de endereço',
					width    : 200,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_TIPO_ENDERECO'
				},
				{
					text   : 'Ativo',
					hidden: true,
					width    : 70,
					sortable : true,
					hideable: false,
					dataIndex: 'SN_ATIVO',
					renderer: renderSnAtivo
				}
			]
		});
			
		this.callParent(arguments);
    }
});