Ext.define('erp.view.Relatorio.Cliente.RelListagemClienteAniversariante', {
    extend: 'Ext.Panel',
	alias: 'widget.relListagemClienteAniversariante',
	layout: {
		type: 'hbox',
		align : 'stretch',
		pack  : 'start'
	},
	border: false,
	autoScroll: true,
	title: 'Relação de Aniversariantes',
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
					xtype: 'fieldset',
					title: 'Data',
					layout: 'absolute',
					itemId :'fdsPeriodoPesquisa',
					width: 264,
					height: 50,
					items : [
						{
							x:4,y:0,
							fieldLabel: 'De:',
							xtype : "datefield",
							itemId : "edtDtIniPesquisa",
							format: 'd/m/Y',
							labelWidth: 20,
							width: 120
						}
					]
				},
				{ 
					x:8,y:85, 
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