Ext.define('erp.controller.Cadastro.CadastroStatusClienteController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroStatusCliente.StatusClienteStore'
    ],
	views: [
		'Cadastro.CadastroStatusCliente.TelaCadastroStatusCliente',
		'Cadastro.CadastroStatusCliente.TelaCadastroStatusClienteEdit',
		'Cadastro.CadastroStatusCliente.GridStatusCliente'
    ],
    refs: [
        {
            ref: 'telaCadastroStatusCliente',
            selector: 'telaCadastroStatusCliente'
        },
        {
            ref: 'telaCadastroStatusClienteEdit',
            selector: 'telaCadastroStatusClienteEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroStatusCliente': {
				afterrender: this.telaCadastroStatusCliente_afterrender,
				beforedestroy: this.telaCadastroStatusCliente_beforedestroy
            },
			'telaCadastroStatusCliente #btnNovoStatusCliente': {
				click: this.telaCadastroStatusCliente_btnNovoStatusCliente_click
			},
			'telaCadastroStatusCliente #btnEditarStatusCliente': {
				click: this.telaCadastroStatusCliente_btnEditarStatusCliente_click
			},	
			'telaCadastroStatusCliente #gridStatusCliente': {
				itemdblclick: this.telaCadastroStatusCliente_gridStatusCliente_itemdblclick
			},
			'telaCadastroStatusCliente #btnExcluirStatusCliente': {
				click: this.telaCadastroStatusCliente_btnExcluirStatusCliente_click
			},
			'telaCadastroStatusCliente #btnAtualizarLista': {
				click: this.telaCadastroStatusCliente_btnAtualizarLista_click
			},
			'telaCadastroStatusCliente #btnFiltroPesquisa': {
				click: this.telaCadastroStatusCliente_btnFiltroPesquisa_click
			},	
			'telaCadastroStatusClienteEdit #btnSalvar': {
				click: this.telaCadastroStatusClienteEdit_btnSalvar_click
			},
			'telaCadastroStatusCliente #btnPesquisarPesquisa': {
				click: this.CadastroStatusCliente_btnPesquisarPesquisa_click
			},
			'telaCadastroStatusCliente #btnLimparPesquisa': {
				click: this.CadastroStatusCliente_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarStatusCliente: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroStatusClienteStatusClienteStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroStatusClienteController.php?op=getListaStatusCliente&dsStatusCliente='+controller.getTelaCadastroStatusCliente().getComponent('panPesquisaStatusCliente').getComponent('edtDsStatusClientePesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroStatusCliente().setLoading('Aguarde...');
		
		controller.getTelaCadastroStatusCliente().getComponent('gridStatusCliente').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroStatusCliente().getComponent('gridStatusCliente') != undefined) {
					controller.getTelaCadastroStatusCliente().getComponent('gridStatusCliente').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroStatusClienteStatusClienteStoreStore().removeAll();
			}
			controller.getTelaCadastroStatusCliente().setLoading(false);
		});
			
	},	
	
	telaCadastroStatusCliente_afterrender: function(panel) {
		this.pesquisarStatusCliente();
	},
	
	telaCadastroStatusCliente_beforedestroy: function(panel) {
		this.getCadastroCadastroStatusClienteStatusClienteStoreStore().removeAll();
	},

	telaCadastroStatusCliente_btnNovoStatusCliente_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroStatusCliente.TelaCadastroStatusClienteEdit').show();
		
		this.getTelaCadastroStatusClienteEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroStatusClienteEdit().down('form').getComponent('edtDsStatusCliente').focus(false,300); 
	},

	prepararEdicaoStatusCliente: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroStatusCliente.TelaCadastroStatusClienteEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroStatusClienteEdit().down('form').getComponent('edtDsStatusCliente').focus(false,300);	
	},	
	
	telaCadastroStatusCliente_btnEditarStatusCliente_click: function(button) {
		var record = this.getTelaCadastroStatusCliente().getComponent('gridStatusCliente').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoStatusCliente(record[0]);
		}
	},

	telaCadastroStatusCliente_gridStatusCliente_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoStatusCliente(record);
		}
	},

	telaCadastroStatusCliente_btnExcluirStatusCliente_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroStatusCliente().getComponent('gridStatusCliente').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroStatusCliente().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroStatusClienteController.php?op=excluir',
							params: {
								cdStatusCliente: record[0].get('CD_STATUS_CLIENTE')	
							},
							success: function(response) {
								controller.getTelaCadastroStatusCliente().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarStatusCliente();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroStatusCliente().setLoading(false);
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
	
	telaCadastroStatusCliente_btnAtualizarLista_click: function(button) {
		this.pesquisarStatusCliente();	
	},	
	
	telaCadastroStatusCliente_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroStatusCliente().getComponent('panPesquisaStatusCliente').isHidden()) {
			this.getTelaCadastroStatusCliente().getComponent('panPesquisaStatusCliente').setVisible(true);
		} else {
			this.getTelaCadastroStatusCliente().getComponent('panPesquisaStatusCliente').setVisible(false);
		}
	},

	telaCadastroStatusClienteEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroStatusClienteStatusClienteStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroStatusCliente.StatusClienteModel');
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
				url: '../erp/controller/Cadastro/CadastroStatusClienteController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarStatusCliente();
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

	CadastroStatusCliente_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarStatusCliente();
	},
	
	CadastroStatusCliente_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroStatusCliente().getComponent('panPesquisaStatusCliente').getComponent('edtDsStatusClientePesquisa').setValue('');
		this.pesquisarStatusCliente();
	}
	
});