Ext.define('erp.controller.Cadastro.CadastroClassificacaoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroClassificacao.ClassificacaoStore'
    ],
	views: [
		'Cadastro.CadastroClassificacao.TelaCadastroClassificacao',
		'Cadastro.CadastroClassificacao.TelaCadastroClassificacaoEdit',
		'Cadastro.CadastroClassificacao.GridClassificacao'
    ],
    refs: [
        {
            ref: 'telaCadastroClassificacao',
            selector: 'telaCadastroClassificacao'
        },
        {
            ref: 'telaCadastroClassificacaoEdit',
            selector: 'telaCadastroClassificacaoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroClassificacao': {
				afterrender: this.telaCadastroClassificacao_afterrender,
				beforedestroy: this.telaCadastroClassificacao_beforedestroy
            },
			'telaCadastroClassificacao #btnNovoClassificacao': {
				click: this.telaCadastroClassificacao_btnNovoClassificacao_click
			},
			'telaCadastroClassificacao #btnEditarClassificacao': {
				click: this.telaCadastroClassificacao_btnEditarClassificacao_click
			},	
			'telaCadastroClassificacao #gridClassificacao': {
				itemdblclick: this.telaCadastroClassificacao_gridClassificacao_itemdblclick
			},
			'telaCadastroClassificacao #btnExcluirClassificacao': {
				click: this.telaCadastroClassificacao_btnExcluirClassificacao_click
			},
			'telaCadastroClassificacao #btnAtualizarLista': {
				click: this.telaCadastroClassificacao_btnAtualizarLista_click
			},
			'telaCadastroClassificacao #btnFiltroPesquisa': {
				click: this.telaCadastroClassificacao_btnFiltroPesquisa_click
			},	
			'telaCadastroClassificacaoEdit #btnSalvar': {
				click: this.telaCadastroClassificacaoEdit_btnSalvar_click
			},
			'telaCadastroClassificacao #btnPesquisarPesquisa': {
				click: this.CadastroClassificacao_btnPesquisarPesquisa_click
			},
			'telaCadastroClassificacao #btnLimparPesquisa': {
				click: this.CadastroClassificacao_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarClassificacao: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroClassificacaoClassificacaoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroClassificacaoController.php?op=getListaClassificacao&dsClassificacao='+controller.getTelaCadastroClassificacao().getComponent('panPesquisaClassificacao').getComponent('edtDsClassificacaoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroClassificacao().setLoading('Aguarde...');
		
		controller.getTelaCadastroClassificacao().getComponent('gridClassificacao').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroClassificacao().getComponent('gridClassificacao') != undefined) {
					controller.getTelaCadastroClassificacao().getComponent('gridClassificacao').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroClassificacaoClassificacaoStoreStore().removeAll();
			}
			controller.getTelaCadastroClassificacao().setLoading(false);
		});
			
	},	
	
	telaCadastroClassificacao_afterrender: function(panel) {
		this.pesquisarClassificacao();
	},
	
	telaCadastroClassificacao_beforedestroy: function(panel) {
		this.getCadastroCadastroClassificacaoClassificacaoStoreStore().removeAll();
	},

	telaCadastroClassificacao_btnNovoClassificacao_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroClassificacao.TelaCadastroClassificacaoEdit').show();
		
		this.getTelaCadastroClassificacaoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroClassificacaoEdit().down('form').getComponent('edtDsClassificacao').focus(false,300); 
	},

	prepararEdicaoClassificacao: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroClassificacao.TelaCadastroClassificacaoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroClassificacaoEdit().down('form').getComponent('edtDsClassificacao').focus(false,300);	
	},	
	
	telaCadastroClassificacao_btnEditarClassificacao_click: function(button) {
		var record = this.getTelaCadastroClassificacao().getComponent('gridClassificacao').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoClassificacao(record[0]);
		}
	},

	telaCadastroClassificacao_gridClassificacao_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoClassificacao(record);
		}
	},

	telaCadastroClassificacao_btnExcluirClassificacao_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroClassificacao().getComponent('gridClassificacao').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroClassificacao().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroClassificacaoController.php?op=excluir',
							params: {
								cdClassificacao: record[0].get('CD_CLASSIFICACAO')	
							},
							success: function(response) {
								controller.getTelaCadastroClassificacao().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarClassificacao();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroClassificacao().setLoading(false);
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
	
	telaCadastroClassificacao_btnAtualizarLista_click: function(button) {
		this.pesquisarClassificacao();	
	},	
	
	telaCadastroClassificacao_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroClassificacao().getComponent('panPesquisaClassificacao').isHidden()) {
			this.getTelaCadastroClassificacao().getComponent('panPesquisaClassificacao').setVisible(true);
		} else {
			this.getTelaCadastroClassificacao().getComponent('panPesquisaClassificacao').setVisible(false);
		}
	},

	telaCadastroClassificacaoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroClassificacaoClassificacaoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroClassificacao.ClassificacaoModel');
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
				url: '../erp/controller/Cadastro/CadastroClassificacaoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarClassificacao();
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

	CadastroClassificacao_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarClassificacao();
	},
	
	CadastroClassificacao_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroClassificacao().getComponent('panPesquisaClassificacao').getComponent('edtDsClassificacaoPesquisa').setValue('');
		this.pesquisarClassificacao();
	}
	
});