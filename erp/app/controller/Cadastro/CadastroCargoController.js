Ext.define('erp.controller.Cadastro.CadastroCargoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroCargo.CargoStore'
    ],
	views: [
		'Cadastro.CadastroCargo.TelaCadastroCargo',
		'Cadastro.CadastroCargo.TelaCadastroCargoEdit',
		'Cadastro.CadastroCargo.GridCargo'
    ],
    refs: [
        {
            ref: 'telaCadastroCargo',
            selector: 'telaCadastroCargo'
        },
        {
            ref: 'telaCadastroCargoEdit',
            selector: 'telaCadastroCargoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroCargo': {
				afterrender: this.telaCadastroCargo_afterrender,
				beforedestroy: this.telaCadastroCargo_beforedestroy
            },
			'telaCadastroCargo #btnNovoCargo': {
				click: this.telaCadastroCargo_btnNovoCargo_click
			},
			'telaCadastroCargo #btnEditarCargo': {
				click: this.telaCadastroCargo_btnEditarCargo_click
			},	
			'telaCadastroCargo #gridCargo': {
				itemdblclick: this.telaCadastroCargo_gridCargo_itemdblclick
			},
			'telaCadastroCargo #btnExcluirCargo': {
				click: this.telaCadastroCargo_btnExcluirCargo_click
			},
			'telaCadastroCargo #btnAtualizarLista': {
				click: this.telaCadastroCargo_btnAtualizarLista_click
			},
			'telaCadastroCargo #btnFiltroPesquisa': {
				click: this.telaCadastroCargo_btnFiltroPesquisa_click
			},	
			'telaCadastroCargoEdit #btnSalvar': {
				click: this.telaCadastroCargoEdit_btnSalvar_click
			},
			'telaCadastroCargo #btnPesquisarPesquisa': {
				click: this.CadastroCargo_btnPesquisarPesquisa_click
			},
			'telaCadastroCargo #btnLimparPesquisa': {
				click: this.CadastroCargo_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarCargo: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroCargoCargoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroCargoController.php?op=getListaCargo&dsCargo='+controller.getTelaCadastroCargo().getComponent('panPesquisaCargo').getComponent('edtDsCargoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroCargo().setLoading('Aguarde...');
		
		controller.getTelaCadastroCargo().getComponent('gridCargo').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroCargo().getComponent('gridCargo') != undefined) {
					controller.getTelaCadastroCargo().getComponent('gridCargo').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroCargoCargoStoreStore().removeAll();
			}
			controller.getTelaCadastroCargo().setLoading(false);
		});
			
	},	
	
	telaCadastroCargo_afterrender: function(panel) {
		this.pesquisarCargo();
	},
	
	telaCadastroCargo_beforedestroy: function(panel) {
		this.getCadastroCadastroCargoCargoStoreStore().removeAll();
	},

	telaCadastroCargo_btnNovoCargo_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroCargo.TelaCadastroCargoEdit').show();
		
		this.getTelaCadastroCargoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroCargoEdit().down('form').getComponent('edtDsCargo').focus(false,300); 
	},

	prepararEdicaoCargo: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroCargo.TelaCadastroCargoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroCargoEdit().down('form').getComponent('edtDsCargo').focus(false,300);	
	},	
	
	telaCadastroCargo_btnEditarCargo_click: function(button) {
		var record = this.getTelaCadastroCargo().getComponent('gridCargo').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoCargo(record[0]);
		}
	},

	telaCadastroCargo_gridCargo_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoCargo(record);
		}
	},

	telaCadastroCargo_btnExcluirCargo_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroCargo().getComponent('gridCargo').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroCargo().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroCargoController.php?op=excluir',
							params: {
								cdCargo: record[0].get('CD_CARGO')	
							},
							success: function(response) {
								controller.getTelaCadastroCargo().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarCargo();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroCargo().setLoading(false);
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
	
	telaCadastroCargo_btnAtualizarLista_click: function(button) {
		this.pesquisarCargo();	
	},	
	
	telaCadastroCargo_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroCargo().getComponent('panPesquisaCargo').isHidden()) {
			this.getTelaCadastroCargo().getComponent('panPesquisaCargo').setVisible(true);
		} else {
			this.getTelaCadastroCargo().getComponent('panPesquisaCargo').setVisible(false);
		}
	},

	telaCadastroCargoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroCargoCargoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroCargo.CargoModel');
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
				url: '../erp/controller/Cadastro/CadastroCargoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarCargo();
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

	CadastroCargo_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarCargo();
	},
	
	CadastroCargo_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroCargo().getComponent('panPesquisaCargo').getComponent('edtDsCargoPesquisa').setValue('');
		this.pesquisarCargo();
	}
	
});