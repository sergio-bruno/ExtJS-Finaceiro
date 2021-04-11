Ext.define('erp.controller.Cadastro.CadastroStatusFichaController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroStatusFicha.StatusFichaStore'
    ],
	views: [
		'Cadastro.CadastroStatusFicha.TelaCadastroStatusFicha',
		'Cadastro.CadastroStatusFicha.TelaCadastroStatusFichaEdit',
		'Cadastro.CadastroStatusFicha.GridStatusFicha'
    ],
    refs: [
        {
            ref: 'telaCadastroStatusFicha',
            selector: 'telaCadastroStatusFicha'
        },
        {
            ref: 'telaCadastroStatusFichaEdit',
            selector: 'telaCadastroStatusFichaEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroStatusFicha': {
				afterrender: this.telaCadastroStatusFicha_afterrender,
				beforedestroy: this.telaCadastroStatusFicha_beforedestroy
            },
			'telaCadastroStatusFicha #btnNovoStatusFicha': {
				click: this.telaCadastroStatusFicha_btnNovoStatusFicha_click
			},
			'telaCadastroStatusFicha #btnEditarStatusFicha': {
				click: this.telaCadastroStatusFicha_btnEditarStatusFicha_click
			},	
			'telaCadastroStatusFicha #gridStatusFicha': {
				itemdblclick: this.telaCadastroStatusFicha_gridStatusFicha_itemdblclick
			},
			'telaCadastroStatusFicha #btnExcluirStatusFicha': {
				click: this.telaCadastroStatusFicha_btnExcluirStatusFicha_click
			},
			'telaCadastroStatusFicha #btnAtualizarLista': {
				click: this.telaCadastroStatusFicha_btnAtualizarLista_click
			},
			'telaCadastroStatusFicha #btnFiltroPesquisa': {
				click: this.telaCadastroStatusFicha_btnFiltroPesquisa_click
			},	
			'telaCadastroStatusFichaEdit #btnSalvar': {
				click: this.telaCadastroStatusFichaEdit_btnSalvar_click
			},
			'telaCadastroStatusFicha #btnPesquisarPesquisa': {
				click: this.CadastroStatusFicha_btnPesquisarPesquisa_click
			},
			'telaCadastroStatusFicha #btnLimparPesquisa': {
				click: this.CadastroStatusFicha_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarStatusFicha: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroStatusFichaStatusFichaStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroStatusFichaController.php?op=getListaStatusFicha&dsStatusFicha='+controller.getTelaCadastroStatusFicha().getComponent('panPesquisaStatusFicha').getComponent('edtDsStatusFichaPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroStatusFicha().setLoading('Aguarde...');
		
		controller.getTelaCadastroStatusFicha().getComponent('gridStatusFicha').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroStatusFicha().getComponent('gridStatusFicha') != undefined) {
					controller.getTelaCadastroStatusFicha().getComponent('gridStatusFicha').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroStatusFichaStatusFichaStoreStore().removeAll();
			}
			controller.getTelaCadastroStatusFicha().setLoading(false);
		});
			
	},	
	
	telaCadastroStatusFicha_afterrender: function(panel) {
		this.pesquisarStatusFicha();
	},
	
	telaCadastroStatusFicha_beforedestroy: function(panel) {
		this.getCadastroCadastroStatusFichaStatusFichaStoreStore().removeAll();
	},

	telaCadastroStatusFicha_btnNovoStatusFicha_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroStatusFicha.TelaCadastroStatusFichaEdit').show();
		
		this.getTelaCadastroStatusFichaEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroStatusFichaEdit().down('form').getComponent('edtDsStatusFicha').focus(false,300); 
	},

	prepararEdicaoStatusFicha: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroStatusFicha.TelaCadastroStatusFichaEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroStatusFichaEdit().down('form').getComponent('edtDsStatusFicha').focus(false,300);	
	},	
	
	telaCadastroStatusFicha_btnEditarStatusFicha_click: function(button) {
		var record = this.getTelaCadastroStatusFicha().getComponent('gridStatusFicha').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoStatusFicha(record[0]);
		}
	},

	telaCadastroStatusFicha_gridStatusFicha_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoStatusFicha(record);
		}
	},

	telaCadastroStatusFicha_btnExcluirStatusFicha_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroStatusFicha().getComponent('gridStatusFicha').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroStatusFicha().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroStatusFichaController.php?op=excluir',
							params: {
								cdStatusFicha: record[0].get('CD_STATUS_FICHA')	
							},
							success: function(response) {
								controller.getTelaCadastroStatusFicha().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarStatusFicha();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroStatusFicha().setLoading(false);
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
	
	telaCadastroStatusFicha_btnAtualizarLista_click: function(button) {
		this.pesquisarStatusFicha();	
	},	
	
	telaCadastroStatusFicha_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroStatusFicha().getComponent('panPesquisaStatusFicha').isHidden()) {
			this.getTelaCadastroStatusFicha().getComponent('panPesquisaStatusFicha').setVisible(true);
		} else {
			this.getTelaCadastroStatusFicha().getComponent('panPesquisaStatusFicha').setVisible(false);
		}
	},

	telaCadastroStatusFichaEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroStatusFichaStatusFichaStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroStatusFicha.StatusFichaModel');
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
				url: '../erp/controller/Cadastro/CadastroStatusFichaController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarStatusFicha();
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

	CadastroStatusFicha_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarStatusFicha();
	},
	
	CadastroStatusFicha_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroStatusFicha().getComponent('panPesquisaStatusFicha').getComponent('edtDsStatusFichaPesquisa').setValue('');
		this.pesquisarStatusFicha();
	}
	
});