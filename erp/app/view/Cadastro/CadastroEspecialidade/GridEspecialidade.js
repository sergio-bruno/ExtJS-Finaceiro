﻿Ext.define('erp.view.Cadastro.CadastroEspecialidade.GridEspecialidade', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.telaCadastroEspecialidade_gridEspecialidade',
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
	
		var store = 'Cadastro.CadastroEspecialidade.EspecialidadeStore'; 
		
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
					dataIndex: 'CD_ESPECIALIDADE'
				},
				{
					text   : 'Descrição',
					width    : 200,
					sortable : true,
					hideable: false,
					flex: 1,
					dataIndex: 'DS_ESPECIALIDADE'
				},
				{
					text   : 'Ativo',
					width    : 200,
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

