Ext.define('erp.controller.Cadastro.CadastroTipoConselhoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroTipoConselho.TipoConselhoStore'
    ],
	views: [
		'Cadastro.CadastroTipoConselho.TelaCadastroTipoConselho',
		'Cadastro.CadastroTipoConselho.TelaCadastroTipoConselhoEdit',
		'Cadastro.CadastroTipoConselho.GridTipoConselho'
    ],
    refs: [
        {
            ref: 'telaCadastroTipoConselho',
            selector: 'telaCadastroTipoConselho'
        },
        {
            ref: 'telaCadastroTipoConselhoEdit',
            selector: 'telaCadastroTipoConselhoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroTipoConselho': {
				afterrender: this.telaCadastroTipoConselho_afterrender,
				beforedestroy: this.telaCadastroTipoConselho_beforedestroy
            },
			'telaCadastroTipoConselho #btnNovoTipoConselho': {
				click: this.telaCadastroTipoConselho_btnNovoTipoConselho_click
			},
			'telaCadastroTipoConselho #btnEditarTipoConselho': {
				click: this.telaCadastroTipoConselho_btnEditarTipoConselho_click
			},	
			'telaCadastroTipoConselho #gridTipoConselho': {
				itemdblclick: this.telaCadastroTipoConselho_gridTipoConselho_itemdblclick
			},
			'telaCadastroTipoConselho #btnExcluirTipoConselho': {
				click: this.telaCadastroTipoConselho_btnExcluirTipoConselho_click
			},
			'telaCadastroTipoConselho #btnAtualizarLista': {
				click: this.telaCadastroTipoConselho_btnAtualizarLista_click
			},
			'telaCadastroTipoConselho #btnFiltroPesquisa': {
				click: this.telaCadastroTipoConselho_btnFiltroPesquisa_click
			},	
			'telaCadastroTipoConselhoEdit #btnSalvar': {
				click: this.telaCadastroTipoConselhoEdit_btnSalvar_click
			},
			'telaCadastroTipoConselho #btnPesquisarPesquisa': {
				click: this.CadastroTipoConselho_btnPesquisarPesquisa_click
			},
			'telaCadastroTipoConselho #btnLimparPesquisa': {
				click: this.CadastroTipoConselho_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarTipoConselho: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroTipoConselhoTipoConselhoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroTipoConselhoController.php?op=getListaTipoConselho&dsTipoConselho='+controller.getTelaCadastroTipoConselho().getComponent('panPesquisaTipoConselho').getComponent('edtDsTipoConselhoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroTipoConselho().setLoading('Aguarde...');
		
		controller.getTelaCadastroTipoConselho().getComponent('gridTipoConselho').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroTipoConselho().getComponent('gridTipoConselho') != undefined) {
					controller.getTelaCadastroTipoConselho().getComponent('gridTipoConselho').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroTipoConselhoTipoConselhoStoreStore().removeAll();
			}
			controller.getTelaCadastroTipoConselho().setLoading(false);
		});
			
	},	
	
	telaCadastroTipoConselho_afterrender: function(panel) {
		this.pesquisarTipoConselho();
	},
	
	telaCadastroTipoConselho_beforedestroy: function(panel) {
		this.getCadastroCadastroTipoConselhoTipoConselhoStoreStore().removeAll();
	},

	telaCadastroTipoConselho_btnNovoTipoConselho_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroTipoConselho.TelaCadastroTipoConselhoEdit').show();
		
		this.getTelaCadastroTipoConselhoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroTipoConselhoEdit().down('form').getComponent('edtDsTipoConselho').focus(false,300); 
	},

	prepararEdicaoTipoConselho: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroTipoConselho.TelaCadastroTipoConselhoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroTipoConselhoEdit().down('form').getComponent('edtDsTipoConselho').focus(false,300);	
	},	
	
	telaCadastroTipoConselho_btnEditarTipoConselho_click: function(button) {
		var record = this.getTelaCadastroTipoConselho().getComponent('gridTipoConselho').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoTipoConselho(record[0]);
		}
	},

	telaCadastroTipoConselho_gridTipoConselho_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoTipoConselho(record);
		}
	},

	telaCadastroTipoConselho_btnExcluirTipoConselho_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroTipoConselho().getComponent('gridTipoConselho').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroTipoConselho().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroTipoConselhoController.php?op=excluir',
							params: {
								cdTipoConselho: record[0].get('CD_TIPO_CONSELHO')	
							},
							success: function(response) {
								controller.getTelaCadastroTipoConselho().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarTipoConselho();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroTipoConselho().setLoading(false);
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
	
	telaCadastroTipoConselho_btnAtualizarLista_click: function(button) {
		this.pesquisarTipoConselho();	
	},	
	
	telaCadastroTipoConselho_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroTipoConselho().getComponent('panPesquisaTipoConselho').isHidden()) {
			this.getTelaCadastroTipoConselho().getComponent('panPesquisaTipoConselho').setVisible(true);
		} else {
			this.getTelaCadastroTipoConselho().getComponent('panPesquisaTipoConselho').setVisible(false);
		}
	},

	telaCadastroTipoConselhoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroTipoConselhoTipoConselhoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroTipoConselho.TipoConselhoModel');
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
				url: '../erp/controller/Cadastro/CadastroTipoConselhoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarTipoConselho();
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

	CadastroTipoConselho_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarTipoConselho();
	},
	
	CadastroTipoConselho_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroTipoConselho().getComponent('panPesquisaTipoConselho').getComponent('edtDsTipoConselhoPesquisa').setValue('');
		this.pesquisarTipoConselho();
	}
	
});