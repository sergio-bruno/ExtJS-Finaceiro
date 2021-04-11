Ext.define('erp.view.Viewport', {
    extend: 'Ext.container.Viewport',
	id: 'mainViewport',
    layout: 'border',
    items: [
		{
			region: 'north',
			xtype: 'titlebar'
		},
		{
			region: 'west',
			xtype: 'menuprincipal'
		},
		{
			region: 'center',
			xtype: 'tabpanel',
			id: 'tabPanelPrincipal'
		},
		{
			region: 'south',
			xtype: 'toolbar'
		}
	]
});