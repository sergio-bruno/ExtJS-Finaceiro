Ext.define('erp.view.Relatorio.Movimento.RelListagemMovimento', {
    extend: 'Ext.Panel',
	alias: 'widget.relListagemMovimento',
	layout: {
		type: 'hbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Relação de Fichas de Serviço',
	items: [
		{
			xtype: 'panel',
			itemId: 'panPesquisa',
			layout: 'absolute',
			width: 280,
			collapsible: true,
			collapseDirection: 'left',
			title: 'Parâmetros de impressão',
			border: true,
			defaults: {
				labelAlign: 'top',
				labelSeparator: ''
			},
			items: [
				{
					xtype : "numberfield",
					itemId : "edtCdStatusFicha",
					name: 'CD_STATUS_FICHA',
					hidden: true
				},
				{
					x:10,y:10,
					fieldLabel: 'Status da Ficha',
					itemId : "cboCdStatusFicha",
					width: 242,
					xtype : "combobox",
					store: 'Generico.StatusFichaStore',
					displayField: 'DS_STATUS_FICHA',
					valueField: 'CD_STATUS_FICHA',
					queryDelay: 250,
					queryParam: 'dsStatusFicha',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}
				},
				{
					xtype : "numberfield",
					itemId : "edtCdStatusCliente",
					name: 'CD_STATUS_CLIENTE',
					hidden: true
				},
				{
					x:10,y:58,
					fieldLabel: 'Status do Cliente',
					itemId : "cboCdStatusCliente",
					width: 242,
					xtype : "combobox",
					store: 'Generico.StatusClienteStore',
					displayField: 'DS_STATUS_CLIENTE',
					valueField: 'CD_STATUS_CLIENTE',
					queryDelay: 250,
					queryParam: 'dsStatusCliente',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}
				},
				{ 
					x:10,y:116, 
					xtype: 'button',
					itemId: 'btnImprimir',
					width: 100,
					text: 'Imprimir',
					iconCls: 'print_16'
				}
			]
		},
		{
			xtype: 'container',
			itemId: 'cntRelatorio',
			flex: 1,
			html: '<div align="center"><b>Aguarde...</b></div>',
			hidden: true,
			layout: {
				type: 'vbox',
				align : 'stretch',
				pack  : 'start'
			}
		}
	]
});