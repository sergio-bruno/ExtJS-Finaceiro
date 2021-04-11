Ext.define('erp.controller.Global.TitlebarController', {
    extend: 'Ext.app.Controller',
    views: [
		'erp.view.Global.Titlebar',
		'erp.view.Global.SelecaoSetor.SelecaoSetor'
	],
	stores: [
		'Global.SelecaoSetor.SetorStore'
	],
	taskSessao: null,
    init: function() {
        this.control({
            'titlebar': {
                afterrender: this.titlebar_AfterRender
            },
            'menuitem[id=mniSairSistema_Titlebar]': {
                click: this.mniSairSistema_Titlebar_Click
            },
            'menuitem[id=mniSelecionarSetor_Titlebar]': {
                click: this.mniSelecionarSetor_Titlebar_Click
            },
			'button[id=btnOk_Geral_SelecaoSetor_SelecaoSetor]': {
				click: this.btnOk_Geral_SelecaoSetor_SelecaoSetor_Click
			}
        });
    },
	
	titlebar_AfterRender: function(panel) {
		var controller = this;
		
		controller.carregarDados(panel);
		controller.getController('Global.UtilController').carregarFuncionalidadeUsuario();
		
		 /*controller.taskSessao = new Ext.util.DelayedTask(function(){
			controller.getController('Global.UtilController').verificarSessao();
			controller.taskSessao.delay(10000);
		 });
		 controller.taskSessao.delay(10000);*/
		
	},
	
	carregarDados: function(panel) {
		//Ext.getCmp('mainViewport').setLoading('Carregando...');		
		Ext.getCmp('lblTitulo_Titlebar').setText('Sistemas Integrados ('+this.getController('Global.UtilController').versaoSistema+')');
		
		//Carrega os dados do usuário logado
		Ext.Ajax.request({
			url: '../erp/controller/Global/TitlebarController.php?op=getUsuarioLogado',
			success: function(response) {
				//Ext.getCmp('mainViewport').setLoading(false);
				var res = Ext.JSON.decode(response.responseText);
				if (res.success) {
					Ext.getCmp('btnUsuario_Titlebar').setText(res.items['NM_LOGIN']);
				} else {
					Ext.msgbox.msg('Erro', 'Ocorreu um erro:</br></br><i>'+res.message+'</i>', 'E', 8000);
				}
			},
			failure: function(response) {
				//Ext.getCmp('mainViewport').setLoading(false);	
				Ext.msgbox.msg('Erro', 'Ocorreu um erro:</br></br><i>'+response.responseText+'</i>', 'E', 8000);
			},
			method: 'get'
		});
		
	},
	
	btnOk_Geral_SelecaoSetor_SelecaoSetor_Click: function(button) {
	
		var controller = this;
		var win = button.up('window');
		var form = win.down('form').getForm();
		var tabPanel = Ext.getCmp('tabPanelPrincipal');
		
		if (form.isValid()) {
		
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			Ext.Ajax.request({
				url: '../erp/controller/Global/TitlebarController.php?op=setSetorLogado',
				params: {
					cdSetor: Ext.getCmp('cboCdSetor_Geral_SelecaoSetor_SelecaoSetor').getValue()
				},
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					win.close();
					var res = Ext.JSON.decode(response.responseText);
					Ext.getCmp('lblSetor_Titlebar').setText('Setor: ' + res.items.DS_SETOR);	
					tabPanel.removeAll();					
				},
				failure: function(response) {
					win.setLoading(false);
					Ext.msgbox.msg('Erro', 'Ocorreu um erro ao registrar o setor de trabalho:</br></br><i>'+response.responseText+'</i>', 'E', 8000);
				},
				method: 'post'
			});
		}
	},
	
	mniSelecionarSetor_Titlebar_Click: function(item) {
		Ext.create('erp.view.Global.SelecaoSetor.SelecaoSetor').show();
	},
	
	mniSairSistema_Titlebar_Click: function(item) {
		this.efetuarLogoff();
	},
	
	efetuarLogoff: function() {
		Ext.getCmp('mainViewport').setLoading('Saindo do sistema eclesiástico. Aguarde...');
		Ext.Ajax.request({
			url: '../erp/controller/logoff.php',
			success: function(response) {
				//location.href="../../index.php";
				location.href="index.php";
			}
		});	
	}
	
});
