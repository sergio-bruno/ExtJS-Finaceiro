Ext.define('erp.controller.Cadastro.CadastroTipoMovimentoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroTipoMovimento.TipoMovimentoStore'
    ],
	views: [
		'Cadastro.CadastroTipoMovimento.TelaCadastroTipoMovimento',
		'Cadastro.CadastroTipoMovimento.TelaCadastroTipoMovimentoEdit',
		'Cadastro.CadastroTipoMovimento.GridTipoMovimento'
    ],
    refs: [
        {
            ref: 'telaCadastroTipoMovimento',
            selector: 'telaCadastroTipoMovimento'
        },
        {
            ref: 'telaCadastroTipoMovimentoEdit',
            selector: 'telaCadastroTipoMovimentoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroTipoMovimento': {
				afterrender: this.telaCadastroTipoMovimento_afterrender,
				beforedestroy: this.telaCadastroTipoMovimento_beforedestroy
            },
			'telaCadastroTipoMovimento #btnNovoTipoMovimento': {
				click: this.telaCadastroTipoMovimento_btnNovoTipoMovimento_click
			},
			'telaCadastroTipoMovimento #btnEditarTipoMovimento': {
				click: this.telaCadastroTipoMovimento_btnEditarTipoMovimento_click
			},	
			'telaCadastroTipoMovimento #gridTipoMovimento': {
				itemdblclick: this.telaCadastroTipoMovimento_gridTipoMovimento_itemdblclick
			},
			'telaCadastroTipoMovimento #btnExcluirTipoMovimento': {
				click: this.telaCadastroTipoMovimento_btnExcluirTipoMovimento_click
			},
			'telaCadastroTipoMovimento #btnAtualizarLista': {
				click: this.telaCadastroTipoMovimento_btnAtualizarLista_click
			},
			'telaCadastroTipoMovimento #btnFiltroPesquisa': {
				click: this.telaCadastroTipoMovimento_btnFiltroPesquisa_click
			},	
			'telaCadastroTipoMovimentoEdit #btnSalvar': {
				click: this.telaCadastroTipoMovimentoEdit_btnSalvar_click
			},
			'telaCadastroTipoMovimento #btnPesquisarPesquisa': {
				click: this.CadastroTipoMovimento_btnPesquisarPesquisa_click
			},
			'telaCadastroTipoMovimento #btnLimparPesquisa': {
				click: this.CadastroTipoMovimento_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarTipoMovimento: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroTipoMovimentoTipoMovimentoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroTipoMovimentoController.php?op=getListaTipoMovimento&dsTipoMovimento='+controller.getTelaCadastroTipoMovimento().getComponent('panPesquisaTipoMovimento').getComponent('edtDsTipoMovimentoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroTipoMovimento().setLoading('Aguarde...');
		
		controller.getTelaCadastroTipoMovimento().getComponent('gridTipoMovimento').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroTipoMovimento().getComponent('gridTipoMovimento') != undefined) {
					controller.getTelaCadastroTipoMovimento().getComponent('gridTipoMovimento').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroTipoMovimentoTipoMovimentoStoreStore().removeAll();
			}
			controller.getTelaCadastroTipoMovimento().setLoading(false);
		});
			
	},	
	
	telaCadastroTipoMovimento_afterrender: function(panel) {
		this.pesquisarTipoMovimento();
	},
	
	telaCadastroTipoMovimento_beforedestroy: function(panel) {
		this.getCadastroCadastroTipoMovimentoTipoMovimentoStoreStore().removeAll();
	},

	telaCadastroTipoMovimento_btnNovoTipoMovimento_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroTipoMovimento.TelaCadastroTipoMovimentoEdit').show();
		
		this.getTelaCadastroTipoMovimentoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroTipoMovimentoEdit().down('form').getComponent('edtDsTipoMovimento').focus(false,300); 
	},

	prepararEdicaoTipoMovimento: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroTipoMovimento.TelaCadastroTipoMovimentoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroTipoMovimentoEdit().down('form').getComponent('edtDsTipoMovimento').focus(false,300);	
	},	
	
	telaCadastroTipoMovimento_btnEditarTipoMovimento_click: function(button) {
		var record = this.getTelaCadastroTipoMovimento().getComponent('gridTipoMovimento').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoTipoMovimento(record[0]);
		}
	},

	telaCadastroTipoMovimento_gridTipoMovimento_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoTipoMovimento(record);
		}
	},

	telaCadastroTipoMovimento_btnExcluirTipoMovimento_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroTipoMovimento().getComponent('gridTipoMovimento').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroTipoMovimento().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroTipoMovimentoController.php?op=excluir',
							params: {
								cdTipoMovimento: record[0].get('CD_TIPO_MOVIMENTO')	
							},
							success: function(response) {
								controller.getTelaCadastroTipoMovimento().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarTipoMovimento();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroTipoMovimento().setLoading(false);
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
	
	telaCadastroTipoMovimento_btnAtualizarLista_click: function(button) {
		this.pesquisarTipoMovimento();	
	},	
	
	telaCadastroTipoMovimento_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroTipoMovimento().getComponent('panPesquisaTipoMovimento').isHidden()) {
			this.getTelaCadastroTipoMovimento().getComponent('panPesquisaTipoMovimento').setVisible(true);
		} else {
			this.getTelaCadastroTipoMovimento().getComponent('panPesquisaTipoMovimento').setVisible(false);
		}
	},

	telaCadastroTipoMovimentoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroTipoMovimentoTipoMovimentoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroTipoMovimento.TipoMovimentoModel');
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
				url: '../erp/controller/Cadastro/CadastroTipoMovimentoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarTipoMovimento();
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

	CadastroTipoMovimento_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarTipoMovimento();
	},
	
	CadastroTipoMovimento_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroTipoMovimento().getComponent('panPesquisaTipoMovimento').getComponent('edtDsTipoMovimentoPesquisa').setValue('');
		this.pesquisarTipoMovimento();
	}
	
});