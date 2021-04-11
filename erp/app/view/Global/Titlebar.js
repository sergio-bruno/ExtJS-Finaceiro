Ext.define('erp.view.Global.Titlebar', {
    extend: 'Ext.Panel',
    alias: 'widget.titlebar',
	layout: {
		type: 'hbox',
		align : 'middle',
		pack  : 'start'
	},
	id: 'titlebar',
	height: 36,
	border: false,
	bodyStyle: 'background-image: url(../resources/images/titlebar2_bg.png)',
	defaults: {
		margin: '0 1 0 1'
	},
	items:[
		{
			xtype: 'panel',
			bodyStyle: 'background-color: transparent',
			border: false,
			layout: {
				type: 'hbox',
				align : 'middle',
				pack  : 'start'
			},
			defaults: {
				margin: '0 1 0 1'
			},
			items: [ 
				{
					xtype : "image",
					src: '../resources/images/logo_sistema_peq.png',
					width: 100,
					height: 25
				}
			]
		},
		{
			xtype : "label",
			style: 'font-weight:bold;font-size:14px;color:white',
			id: 'lblTitulo_Titlebar'
		},
		{ 
			xtype: 'toolbar',
			cls: 'no-background',
			border: false,
			flex: 1,
			items: [
				'->',
				{
					xtype: 'button',
					id: 'btnUsuario_Titlebar',
					iconCls: 'user_16',
					tooltip: '<b>Usuário logado</b>',
					menu: [
						/*
						{
							text: 'Selecionar setor...',
							id: 'mniSelecionarSetor_Titlebar',
							iconCls: 'home_16'
						},
						'-',
						*/
						{
							text: 'Sair',
							id: 'mniSairSistema_Titlebar',
							iconCls: 'logoff_16'
						}
					]
				},
				{
					xtype : "label",
					style: 'font-weight:bold;font-size:12px;color:white',
					id: 'lblSetor_Titlebar'
				}
			]
		}
	]
});