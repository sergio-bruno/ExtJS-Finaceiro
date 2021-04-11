Ext.define('erp.view.Relatorio.Cliente.RelListagemCliente', {
    extend: 'Ext.Panel',
	alias: 'widget.relListagemCliente',
	layout: {
		type: 'hbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Relação de Clientes',
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
					x:8,y:24, 
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