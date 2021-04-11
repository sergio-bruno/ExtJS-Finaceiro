Ext.define('erp.controller.Global.MenuPrincipalController', {
    extend: 'Ext.app.Controller',
    views: [
		'Global.MenuPrincipal'
	],
	stores: [
		'Global.MenuPrincipal.GrupoMenuStore',
		'Global.MenuPrincipal.MenuStore'
	],
    init: function() {
        this.control({
            'treepanel': {
                itemclick: this.treePanel_ItemClick
            },
			'menuprincipal': {
				afterrender: this.menuprincipal_afterrender
			}
        });
    },
	
	treePanel_ItemClick: function( panel, record, item, index, e, eOpts ) {
		if (record.isLeaf()) {
			this.abrirTela(record.get('hrefTarget'),record.get('hrefTarget'));
			Ext.getCmp('menuPrincipal').collapse();
		}
	},
	
	abrirTela: function(id,nome) {
        var tabPanel = Ext.getCmp('tabPanelPrincipal');
		var tab = undefined;
		if (tabPanel.getComponent(id) == undefined) {	
			tab = tabPanel.add(
				Ext.create(nome, {
					id: id,
					closable: true			
				})
			).show();
		} else {
			tab = tabPanel.getComponent(id);
		}
		tabPanel.setActiveTab(tab);
	},
	
	abrirRelatorio: function(id,nome,caminho) {
	   this.abrirTela('erp.view.Global.ReportViewer'+'-'+id,'erp.view.Global.ReportViewer');
	   var telaRelatorio = Ext.getCmp('erp.view.Global.ReportViewer'+'-'+id);
	   telaRelatorio.setTitle(nome);
	   telaRelatorio.removeAll();
	   telaRelatorio.add(
			Ext.create('Ext.ux.IFrame', {
				src: caminho,
				flex: 1
			})
	   );
	   telaRelatorio.show();
	},
	
	menuprincipal_afterrender: function(panel) {	
		this.carregar();
	},
	
	carregar: function(){
		var menuPrincipal = Ext.getCmp('menuPrincipal');
		
		//Carrega os grupos com os respectivos menus
		var grupoMenuStore = this.getGlobalMenuPrincipalGrupoMenuStoreStore();
		var prx = grupoMenuStore.getProxy();
		Ext.apply(prx, { url: '../erp/controller/Global/MenuPrincipalController.php?op=getGrupoMenu'});
		grupoMenuStore.setProxy(prx);
		//menuPrincipal.setLoading('Aguarde...');
		grupoMenuStore.load();
		grupoMenuStore.on('load',  function handleLoad(st, records, successful, eOpts) {
			if (grupoMenuStore.getCount() > 0) {  			
				grupoMenuStore.data.each(function(item, index, count) {
					
					//Cria o store com base na tabela de menus
					menuStore = Ext.create('Ext.data.TreeStore', {
						proxy: {
							type: 'ajax',
							url: '../erp/controller/Global/MenuPrincipalController.php?op=carregarMenu&cdGrupoMenu='+item.get('CD_GRUPO_MENU'),
							method: 'get'
						}
					});
		
					menuPrincipal.add(
						{
							xtype: 'treepanel',
							title: item.get('DS_GRUPO_MENU'),
							rootVisible: false,
							singleExpand: true,
							useArrows: true,
							id: 'grupoMenu_'+item.get('CD_GRUPO_MENU'),
							store: menuStore
						}
					);	

				});
			}
			//menuPrincipal.setLoading(false);
			grupoMenuStore.un('load',handleLoad);

		});
	
	}
	
});
