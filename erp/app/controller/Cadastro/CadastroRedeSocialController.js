Ext.define('erp.controller.Cadastro.CadastroRedeSocialController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroRedeSocial.RedeSocialStore'
    ],
	views: [
		'Cadastro.CadastroRedeSocial.TelaCadastroRedeSocial',
		'Cadastro.CadastroRedeSocial.TelaCadastroRedeSocialEdit',
		'Cadastro.CadastroRedeSocial.GridRedeSocial'
    ],
    refs: [
        {
            ref: 'telaCadastroRedeSocial',
            selector: 'telaCadastroRedeSocial'
        },
        {
            ref: 'telaCadastroRedeSocialEdit',
            selector: 'telaCadastroRedeSocialEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroRedeSocial': {
				afterrender: this.telaCadastroRedeSocial_afterrender,
				beforedestroy: this.telaCadastroRedeSocial_beforedestroy
            },
			'telaCadastroRedeSocial #btnNovoRedeSocial': {
				click: this.telaCadastroRedeSocial_btnNovoRedeSocial_click
			},
			'telaCadastroRedeSocial #btnEditarRedeSocial': {
				click: this.telaCadastroRedeSocial_btnEditarRedeSocial_click
			},	
			'telaCadastroRedeSocial #gridRedeSocial': {
				itemdblclick: this.telaCadastroRedeSocial_gridRedeSocial_itemdblclick
			},
			'telaCadastroRedeSocial #btnExcluirRedeSocial': {
				click: this.telaCadastroRedeSocial_btnExcluirRedeSocial_click
			},
			'telaCadastroRedeSocial #btnAtualizarLista': {
				click: this.telaCadastroRedeSocial_btnAtualizarLista_click
			},
			'telaCadastroRedeSocial #btnFiltroPesquisa': {
				click: this.telaCadastroRedeSocial_btnFiltroPesquisa_click
			},	
			'telaCadastroRedeSocialEdit #btnSalvar': {
				click: this.telaCadastroRedeSocialEdit_btnSalvar_click
			},
			'telaCadastroRedeSocial #btnPesquisarPesquisa': {
				click: this.CadastroRedeSocial_btnPesquisarPesquisa_click
			},
			'telaCadastroRedeSocial #btnLimparPesquisa': {
				click: this.CadastroRedeSocial_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarRedeSocial: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroRedeSocialRedeSocialStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroRedeSocialController.php?op=getListaRedeSocial&dsRedeSocial='+controller.getTelaCadastroRedeSocial().getComponent('panPesquisaRedeSocial').getComponent('edtDsRedeSocialPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroRedeSocial().setLoading('Aguarde...');
		
		controller.getTelaCadastroRedeSocial().getComponent('gridRedeSocial').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroRedeSocial().getComponent('gridRedeSocial') != undefined) {
					controller.getTelaCadastroRedeSocial().getComponent('gridRedeSocial').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroRedeSocialRedeSocialStoreStore().removeAll();
			}
			controller.getTelaCadastroRedeSocial().setLoading(false);
		});
			
	},	
	
	telaCadastroRedeSocial_afterrender: function(panel) {
		this.pesquisarRedeSocial();
	},
	
	telaCadastroRedeSocial_beforedestroy: function(panel) {
		this.getCadastroCadastroRedeSocialRedeSocialStoreStore().removeAll();
	},

	telaCadastroRedeSocial_btnNovoRedeSocial_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroRedeSocial.TelaCadastroRedeSocialEdit').show();
		
		this.getTelaCadastroRedeSocialEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroRedeSocialEdit().down('form').getComponent('edtDsRedeSocial').focus(false,300); 
	},

	prepararEdicaoRedeSocial: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroRedeSocial.TelaCadastroRedeSocialEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroRedeSocialEdit().down('form').getComponent('edtDsRedeSocial').focus(false,300);	
	},	
	
	telaCadastroRedeSocial_btnEditarRedeSocial_click: function(button) {
		var record = this.getTelaCadastroRedeSocial().getComponent('gridRedeSocial').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoRedeSocial(record[0]);
		}
	},

	telaCadastroRedeSocial_gridRedeSocial_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoRedeSocial(record);
		}
	},

	telaCadastroRedeSocial_btnExcluirRedeSocial_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroRedeSocial().getComponent('gridRedeSocial').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroRedeSocial().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroRedeSocialController.php?op=excluir',
							params: {
								cdRedeSocial: record[0].get('CD_REDE_SOCIAL')	
							},
							success: function(response) {
								controller.getTelaCadastroRedeSocial().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarRedeSocial();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroRedeSocial().setLoading(false);
								Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+response.responseText+'</i>', 'E', 8000);
							},
							method: 'post'
						});	
					};
				 },
				 icon: Ext.Msg.QUESTION
			});
		}
	},
	
	telaCadastroRedeSocial_btnAtualizarLista_click: function(button) {
		this.pesquisarRedeSocial();	
	},	
	
	telaCadastroRedeSocial_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroRedeSocial().getComponent('panPesquisaRedeSocial').isHidden()) {
			this.getTelaCadastroRedeSocial().getComponent('panPesquisaRedeSocial').setVisible(true);
		} else {
			this.getTelaCadastroRedeSocial().getComponent('panPesquisaRedeSocial').setVisible(false);
		}
	},

	telaCadastroRedeSocialEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroRedeSocialRedeSocialStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroRedeSocial.RedeSocialModel');
		var reg = Ext.create(model, form.getValues(false,false,false,false));
		
		if (form.isValid()) {
		
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (reg.phantom) {
				var op = 'inserir';
			} else {
				var op =  'alterar';
			}
			Ext.Ajax.request({
				url: '../erp/controller/Cadastro/CadastroRedeSocialController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarRedeSocial();
					} else {
						if (res.errorType == 'general') { //Erros de uma maneira geral
							Ext.msgbox.msg('Erro', 'Ocorreu um erro ao salvar o registro:</br></br><i>'+res.message+'</i>', 'E', 8000);
						} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
							Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
						}
					}
				},
				failure: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					Ext.msgbox.msg('Erro', 'Ocorreu um erro ao salvar o registro:</br></br><i>'+response.responseText+'</i>', 'E', 8000);
				},
				method: 'post'
			});
		}
	},

	CadastroRedeSocial_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarRedeSocial();
	},
	
	CadastroRedeSocial_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroRedeSocial().getComponent('panPesquisaRedeSocial').getComponent('edtDsRedeSocialPesquisa').setValue('');
		this.pesquisarRedeSocial();
	}
	
});