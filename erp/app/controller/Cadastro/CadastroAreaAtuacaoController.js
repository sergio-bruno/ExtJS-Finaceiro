Ext.define('erp.controller.Cadastro.CadastroAreaAtuacaoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroAreaAtuacao.AreaAtuacaoStore'
    ],
	views: [
		'Cadastro.CadastroAreaAtuacao.TelaCadastroAreaAtuacao',
		'Cadastro.CadastroAreaAtuacao.TelaCadastroAreaAtuacaoEdit',
		'Cadastro.CadastroAreaAtuacao.GridAreaAtuacao'
    ],
    refs: [
        {
            ref: 'telaCadastroAreaAtuacao',
            selector: 'telaCadastroAreaAtuacao'
        },
        {
            ref: 'telaCadastroAreaAtuacaoEdit',
            selector: 'telaCadastroAreaAtuacaoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroAreaAtuacao': {
				afterrender: this.telaCadastroAreaAtuacao_afterrender,
				beforedestroy: this.telaCadastroAreaAtuacao_beforedestroy
            },
			'telaCadastroAreaAtuacao #btnNovoAreaAtuacao': {
				click: this.telaCadastroAreaAtuacao_btnNovoAreaAtuacao_click
			},
			'telaCadastroAreaAtuacao #btnEditarAreaAtuacao': {
				click: this.telaCadastroAreaAtuacao_btnEditarAreaAtuacao_click
			},	
			'telaCadastroAreaAtuacao #gridAreaAtuacao': {
				itemdblclick: this.telaCadastroAreaAtuacao_gridAreaAtuacao_itemdblclick
			},
			'telaCadastroAreaAtuacao #btnExcluirAreaAtuacao': {
				click: this.telaCadastroAreaAtuacao_btnExcluirAreaAtuacao_click
			},
			'telaCadastroAreaAtuacao #btnAtualizarLista': {
				click: this.telaCadastroAreaAtuacao_btnAtualizarLista_click
			},
			'telaCadastroAreaAtuacao #btnFiltroPesquisa': {
				click: this.telaCadastroAreaAtuacao_btnFiltroPesquisa_click
			},	
			'telaCadastroAreaAtuacaoEdit #btnSalvar': {
				click: this.telaCadastroAreaAtuacaoEdit_btnSalvar_click
			},
			'telaCadastroAreaAtuacao #btnPesquisarPesquisa': {
				click: this.CadastroAreaAtuacao_btnPesquisarPesquisa_click
			},
			'telaCadastroAreaAtuacao #btnLimparPesquisa': {
				click: this.CadastroAreaAtuacao_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarAreaAtuacao: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroAreaAtuacaoAreaAtuacaoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroAreaAtuacaoController.php?op=getListaAreaAtuacao&dsAreaAtuacao='+controller.getTelaCadastroAreaAtuacao().getComponent('panPesquisaAreaAtuacao').getComponent('edtDsAreaAtuacaoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroAreaAtuacao().setLoading('Aguarde...');
		
		controller.getTelaCadastroAreaAtuacao().getComponent('gridAreaAtuacao').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroAreaAtuacao().getComponent('gridAreaAtuacao') != undefined) {
					controller.getTelaCadastroAreaAtuacao().getComponent('gridAreaAtuacao').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroAreaAtuacaoAreaAtuacaoStoreStore().removeAll();
			}
			controller.getTelaCadastroAreaAtuacao().setLoading(false);
		});
			
	},	
	
	telaCadastroAreaAtuacao_afterrender: function(panel) {
		this.pesquisarAreaAtuacao();
	},
	
	telaCadastroAreaAtuacao_beforedestroy: function(panel) {
		this.getCadastroCadastroAreaAtuacaoAreaAtuacaoStoreStore().removeAll();
	},

	telaCadastroAreaAtuacao_btnNovoAreaAtuacao_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroAreaAtuacao.TelaCadastroAreaAtuacaoEdit').show();
		
		this.getTelaCadastroAreaAtuacaoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroAreaAtuacaoEdit().down('form').getComponent('edtDsAreaAtuacao').focus(false,300); 
	},

	prepararEdicaoAreaAtuacao: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroAreaAtuacao.TelaCadastroAreaAtuacaoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroAreaAtuacaoEdit().down('form').getComponent('edtDsAreaAtuacao').focus(false,300);	
	},	
	
	telaCadastroAreaAtuacao_btnEditarAreaAtuacao_click: function(button) {
		var record = this.getTelaCadastroAreaAtuacao().getComponent('gridAreaAtuacao').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoAreaAtuacao(record[0]);
		}
	},

	telaCadastroAreaAtuacao_gridAreaAtuacao_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoAreaAtuacao(record);
		}
	},

	telaCadastroAreaAtuacao_btnExcluirAreaAtuacao_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroAreaAtuacao().getComponent('gridAreaAtuacao').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroAreaAtuacao().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroAreaAtuacaoController.php?op=excluir',
							params: {
								cdAreaAtuacao: record[0].get('CD_AREA_ATUACAO')	
							},
							success: function(response) {
								controller.getTelaCadastroAreaAtuacao().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarAreaAtuacao();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroAreaAtuacao().setLoading(false);
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
	
	telaCadastroAreaAtuacao_btnAtualizarLista_click: function(button) {
		this.pesquisarAreaAtuacao();	
	},	
	
	telaCadastroAreaAtuacao_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroAreaAtuacao().getComponent('panPesquisaAreaAtuacao').isHidden()) {
			this.getTelaCadastroAreaAtuacao().getComponent('panPesquisaAreaAtuacao').setVisible(true);
		} else {
			this.getTelaCadastroAreaAtuacao().getComponent('panPesquisaAreaAtuacao').setVisible(false);
		}
	},

	telaCadastroAreaAtuacaoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroAreaAtuacaoAreaAtuacaoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroAreaAtuacao.AreaAtuacaoModel');
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
				url: '../erp/controller/Cadastro/CadastroAreaAtuacaoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarAreaAtuacao();
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

	CadastroAreaAtuacao_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarAreaAtuacao();
	},
	
	CadastroAreaAtuacao_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroAreaAtuacao().getComponent('panPesquisaAreaAtuacao').getComponent('edtDsAreaAtuacaoPesquisa').setValue('');
		this.pesquisarAreaAtuacao();
	}
	
});