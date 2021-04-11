Ext.define('erp.view.Global.SelecaoSetor.SelecaoSetor', {
    extend: 'Ext.Window',
    alias: 'widget.geral-selecaosetor-selecaossetor',
	layout: 'fit',
    width: 400,  //Largura da janela
    height: 148, //Altura da janela
    resizable: false,
	closable: false,
	modal: true,
	title: 'Setor',
	items: [
		{
			xtype: 'form',
			layout: 'absolute',
			border: false,
			defaults: {
				labelAlign: 'top',
				labelSeparator: ''
			},
			items: [
				{
					xtype : "numberfield",
					id : "edtCdSetor_Geral_SelecaoSetor_SelecaoSetor",
					name: 'CD_SETOR',
					hidden: true
				},	
				{
					x:8,y:8,
					fieldLabel: 'Selecione o setor de trabalho',
					id : "cboCdSetor_Geral_SelecaoSetor_SelecaoSetor",
					width: 370,
					xtype : "combobox",
					store: 'Global.SelecaoSetor.SetorStore',
					displayField: 'DS_SETOR',
					valueField: 'CD_SETOR',
					queryDelay: 250,
					queryParam: 'dsSetor',
					forceSelection: true,
					allowBlank: false,
					minChars: 3
				}
			]
		}
    ],
	buttons: [ 
		{ 
		  id: 'btnOk_Geral_SelecaoSetor_SelecaoSetor',
		  width: 75,
		  height: 25,
		  text: 'Ok',
		  iconCls: 'tick_16'
		}
	]
});