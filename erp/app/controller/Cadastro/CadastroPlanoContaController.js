Ext.define('erp.controller.Cadastro.CadastroPlanoContaController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroPlanoConta.PlanoContaStore'
    ],
	views: [
		'Cadastro.CadastroPlanoConta.TelaCadastroPlanoConta',
		'Cadastro.CadastroPlanoConta.TelaCadastroPlanoContaEdit',
		'Cadastro.CadastroPlanoConta.GridPlanoConta'
    ],
    refs: [
        {
            ref: 'telaCadastroPlanoConta',
            selector: 'telaCadastroPlanoConta'
        },
        {
            ref: 'telaCadastroPlanoContaEdit',
            selector: 'telaCadastroPlanoContaEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroPlanoConta': {
				afterrender: this.telaCadastroPlanoConta_afterrender,
				beforedestroy: this.telaCadastroPlanoConta_beforedestroy
            },
			'telaCadastroPlanoConta #btnNovoPlanoConta': {
				click: this.telaCadastroPlanoConta_btnNovoPlanoConta_click
			},
			'telaCadastroPlanoConta #btnEditarPlanoConta': {
				click: this.telaCadastroPlanoConta_btnEditarPlanoConta_click
			},	
			'telaCadastroPlanoConta #gridPlanoConta': {
				itemdblclick: this.telaCadastroPlanoConta_gridPlanoConta_itemdblclick
			},
			'telaCadastroPlanoConta #btnExcluirPlanoConta': {
				click: this.telaCadastroPlanoConta_btnExcluirPlanoConta_click
			},
			'telaCadastroPlanoConta #btnAtualizarLista': {
				click: this.telaCadastroPlanoConta_btnAtualizarLista_click
			},
			'telaCadastroPlanoConta #btnFiltroPesquisa': {
				click: this.telaCadastroPlanoConta_btnFiltroPesquisa_click
			},	
			'telaCadastroPlanoContaEdit #btnSalvar': {
				click: this.telaCadastroPlanoContaEdit_btnSalvar_click
			},
			'telaCadastroPlanoConta #btnPesquisarPesquisa': {
				click: this.CadastroPlanoConta_btnPesquisarPesquisa_click
			},
			'telaCadastroPlanoConta #btnLimparPesquisa': {
				click: this.CadastroPlanoConta_btnLimparPesquisa_click
			},
			'telaCadastroPlanoContaEdit #cboTpLancamento': {
				change: this.telaCadastroPlanoContaEdit_cboTpLancamento_change
			},
			'telaCadastroPlanoContaEdit #cboTpConta': {
				change: this.telaCadastroPlanoContaEdit_cboTpConta_change
			}
        })   
    },
	
    telaCadastroPlanoContaEdit_cboTpLancamento_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPlanoContaEdit().down('form').getComponent('edtTpLancamento').setValue(newValue);
	},

	telaCadastroPlanoContaEdit_cboTpConta_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPlanoContaEdit().down('form').getComponent('edtTpConta').setValue(newValue);
	},
	
	pesquisarPlanoConta: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroPlanoContaPlanoContaStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroPlanoContaController.php?op=getListaPlanoConta&dsPlanoConta='+controller.getTelaCadastroPlanoConta().getComponent('panPesquisaPlanoConta').getComponent('edtDsPlanoContaPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroPlanoConta().setLoading('Aguarde...');
		
		controller.getTelaCadastroPlanoConta().getComponent('gridPlanoConta').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroPlanoConta().getComponent('gridPlanoConta') != undefined) {
					controller.getTelaCadastroPlanoConta().getComponent('gridPlanoConta').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroPlanoContaPlanoContaStoreStore().removeAll();
			}
			controller.getTelaCadastroPlanoConta().setLoading(false);
		});
			
	},	
	
	telaCadastroPlanoConta_afterrender: function(panel) {
		this.pesquisarPlanoConta();
	},
	
	telaCadastroPlanoConta_beforedestroy: function(panel) {
		this.getCadastroCadastroPlanoContaPlanoContaStoreStore().removeAll();
	},

	telaCadastroPlanoConta_btnNovoPlanoConta_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroPlanoConta.TelaCadastroPlanoContaEdit').show();
		
		this.getTelaCadastroPlanoContaEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroPlanoContaEdit().down('form').getComponent('edtCdConta').focus(false,300); 
	},

	prepararEdicaoPlanoConta: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroPlanoConta.TelaCadastroPlanoContaEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		// Lançamento
		controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('cboTpLancamento').setValue(record.get('TP_LANCAMENTO'));
		if ( record.get('TP_LANCAMENTO') == 'C' ) {
			controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('cboTpLancamento').setRawValue('Crédito');
		} else if ( record.get('TP_LANCAMENTO') == 'D' ) {
			controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('cboTpLancamento').setRawValue('Débito');
		} 
		controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('edtTpLancamento').setValue(record.get('TP_LANCAMENTO'));
		
		// Tipo da conta
		controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('cboTpConta').setValue(record.get('TP_CONTA'));
		if ( record.get('TP_CONTA') == 'A' ) {
			controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('cboTpConta').setRawValue('Análitico');
		} else if ( record.get('TP_CONTA') == 'S' ) {
			controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('cboTpConta').setRawValue('Sintético');
		} 
		controller.getTelaCadastroPlanoContaEdit().down('form').getComponent('edtTpConta').setValue(record.get('TP_CONTA'));
		
		this.getTelaCadastroPlanoContaEdit().down('form').getComponent('edtDsPlanoConta').focus(false,300);	
	},	
	
	telaCadastroPlanoConta_btnEditarPlanoConta_click: function(button) {
		var record = this.getTelaCadastroPlanoConta().getComponent('gridPlanoConta').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoPlanoConta(record[0]);
		}
	},

	telaCadastroPlanoConta_gridPlanoConta_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoPlanoConta(record);
		}
	},

	telaCadastroPlanoConta_btnExcluirPlanoConta_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroPlanoConta().getComponent('gridPlanoConta').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroPlanoConta().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroPlanoContaController.php?op=excluir',
							params: {
								cdPlanoConta: record[0].get('CD_PLANO_CONTA')	
							},
							success: function(response) {
								controller.getTelaCadastroPlanoConta().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarPlanoConta();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroPlanoConta().setLoading(false);
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
	
	telaCadastroPlanoConta_btnAtualizarLista_click: function(button) {
		this.pesquisarPlanoConta();	
	},	
	
	telaCadastroPlanoConta_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroPlanoConta().getComponent('panPesquisaPlanoConta').isHidden()) {
			this.getTelaCadastroPlanoConta().getComponent('panPesquisaPlanoConta').setVisible(true);
		} else {
			this.getTelaCadastroPlanoConta().getComponent('panPesquisaPlanoConta').setVisible(false);
		}
	},

	telaCadastroPlanoContaEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroPlanoContaPlanoContaStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroPlanoConta.PlanoContaModel');
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
				url: '../erp/controller/Cadastro/CadastroPlanoContaController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarPlanoConta();
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

	CadastroPlanoConta_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarPlanoConta();
	},
	
	CadastroPlanoConta_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroPlanoConta().getComponent('panPesquisaPlanoConta').getComponent('edtDsPlanoContaPesquisa').setValue('');
		this.pesquisarPlanoConta();
	}
	
});