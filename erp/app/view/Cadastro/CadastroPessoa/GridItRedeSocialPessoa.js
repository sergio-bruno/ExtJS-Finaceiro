Ext.define('erp.view.Cadastro.CadastroPessoa.GridItRedeSocialPessoa', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroPessoaEdit_gridItRedeSocialPessoa',
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
		
		var store = 'Cadastro.CadastroPessoa.RedeSocialPessoaStore'; 
		
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
					dataIndex: 'CD_REDE_SOCIAL_PESSOA'
				},
				{
					text   : 'Cód. Rede Social',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_REDE_SOCIAL'
				},
				{
					text   : 'Rede Social',
					width    : 170,
					hideable: true,
					dataIndex: 'DS_REDE_SOCIAL'
				},
				{
					text   : 'Endereço da Rede Social',
					width    : 350,
					hideable: true,
					dataIndex: 'DS_REDE_SOCIAL_PESSOA'
				},
				{
					text   : 'Código',
					hidden: true,
					width    : 70,
					hideable: true,
					dataIndex: 'CD_PESSOA'
				},
				/*,
				{
					text   : 'Ativo',
					width    : 70,
					sortable : true,
					hideable: false,
					dataIndex: 'SN_ATIVO',
					renderer: renderSnAtivo
				}*/
			]
		});
			
		this.callParent(arguments);
    }
});