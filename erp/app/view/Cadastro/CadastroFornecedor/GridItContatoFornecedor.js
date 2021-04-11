Ext.define('erp.view.Cadastro.CadastroFornecedor.GridItContatoFornecedor', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroFornecedorEdit_gridItContatoFornecedor',
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

        function renderNrTelefone(val, metaData, record, rowIndex, colIndex, store) {
			if (val != null) {
				val = '(' + val.substr(0,2) + ') ' + val.substr(2,4) + '-' + val.substr(6,4);
			}
			return val;
		};
		
		var store = 'Cadastro.CadastroFornecedor.ContatoFornecedorStore'; 
		
		Ext.apply(this, {
			autoScroll: true,
			store: store,
			viewConfig: {
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
					dataIndex: 'CD_CONTATO'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_PESSOA_PJ'
				},
				{
					text   : 'Cód. Tp. Contato',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_TIPO_CONTATO'
				},
				{
					text   : 'Tp. Contato',
					width    : 100,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_TIPO_CONTATO'
				},
				{
					text   : 'Nome do Contato',
					width    : 330,
					sortable : true,
					hideable: false,
					dataIndex: 'NM_CONTATO'
				},
				{
					text   : 'E-mail',
					width    : 330,
					sortable : true,
					hideable: false,
					dataIndex: 'DS_EMAIL'
				},
				{
					text   : 'Telefone 1',
					width    : 130,
					sortable : true,
					hideable: false,
					dataIndex: 'NR_TELEFONE_1',
					renderer: renderNrTelefone
				},
				{
					text   : 'Telefone 2',
					width    : 130,
					sortable : true,
					hideable: false,
					dataIndex: 'NR_TELEFONE_2',
					renderer: renderNrTelefone
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