Ext.define('erp.controller.Cadastro.CadastroTipoEnderecoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroTipoEndereco.TipoEnderecoStore'
    ],
	views: [
		'Cadastro.CadastroTipoEndereco.TelaCadastroTipoEndereco',
		'Cadastro.CadastroTipoEndereco.TelaCadastroTipoEnderecoEdit',
		'Cadastro.CadastroTipoEndereco.GridTipoEndereco'
    ],
    refs: [
        {
            ref: 'telaCadastroTipoEndereco',
            selector: 'telaCadastroTipoEndereco'
        },
        {
            ref: 'telaCadastroTipoEnderecoEdit',
            selector: 'telaCadastroTipoEnderecoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroTipoEndereco': {
				afterrender: this.telaCadastroTipoEndereco_afterrender,
				beforedestroy: this.telaCadastroTipoEndereco_beforedestroy
            },
			'telaCadastroTipoEndereco #btnNovoTipoEndereco': {
				click: this.telaCadastroTipoEndereco_btnNovoTipoEndereco_click
			},
			'telaCadastroTipoEndereco #btnEditarTipoEndereco': {
				click: this.telaCadastroTipoEndereco_btnEditarTipoEndereco_click
			},	
			'telaCadastroTipoEndereco #gridTipoEndereco': {
				itemdblclick: this.telaCadastroTipoEndereco_gridTipoEndereco_itemdblclick
			},
			'telaCadastroTipoEndereco #btnExcluirTipoEndereco': {
				click: this.telaCadastroTipoEndereco_btnExcluirTipoEndereco_click
			},
			'telaCadastroTipoEndereco #btnAtualizarLista': {
				click: this.telaCadastroTipoEndereco_btnAtualizarLista_click
			},
			'telaCadastroTipoEndereco #btnFiltroPesquisa': {
				click: this.telaCadastroTipoEndereco_btnFiltroPesquisa_click
			},	
			'telaCadastroTipoEnderecoEdit #btnSalvar': {
				click: this.telaCadastroTipoEnderecoEdit_btnSalvar_click
			},
			'telaCadastroTipoEndereco #btnPesquisarPesquisa': {
				click: this.CadastroTipoEndereco_btnPesquisarPesquisa_click
			},
			'telaCadastroTipoEndereco #btnLimparPesquisa': {
				click: this.CadastroTipoEndereco_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarTipoEndereco: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroTipoEnderecoTipoEnderecoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroTipoEnderecoController.php?op=getListaTipoEndereco&dsTipoEndereco='+controller.getTelaCadastroTipoEndereco().getComponent('panPesquisaTipoEndereco').getComponent('edtDsTipoEnderecoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroTipoEndereco().setLoading('Aguarde...');
		
		controller.getTelaCadastroTipoEndereco().getComponent('gridTipoEndereco').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroTipoEndereco().getComponent('gridTipoEndereco') != undefined) {
					controller.getTelaCadastroTipoEndereco().getComponent('gridTipoEndereco').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroTipoEnderecoTipoEnderecoStoreStore().removeAll();
			}
			controller.getTelaCadastroTipoEndereco().setLoading(false);
		});
			
	},	
	
	telaCadastroTipoEndereco_afterrender: function(panel) {
		this.pesquisarTipoEndereco();
	},
	
	telaCadastroTipoEndereco_beforedestroy: function(panel) {
		this.getCadastroCadastroTipoEnderecoTipoEnderecoStoreStore().removeAll();
	},

	telaCadastroTipoEndereco_btnNovoTipoEndereco_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroTipoEndereco.TelaCadastroTipoEnderecoEdit').show();
		
		this.getTelaCadastroTipoEnderecoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroTipoEnderecoEdit().down('form').getComponent('edtDsTipoEndereco').focus(false,300); 
	},

	prepararEdicaoTipoEndereco: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroTipoEndereco.TelaCadastroTipoEnderecoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroTipoEnderecoEdit().down('form').getComponent('edtDsTipoEndereco').focus(false,300);	
	},	
	
	telaCadastroTipoEndereco_btnEditarTipoEndereco_click: function(button) {
		var record = this.getTelaCadastroTipoEndereco().getComponent('gridTipoEndereco').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoTipoEndereco(record[0]);
		}
	},

	telaCadastroTipoEndereco_gridTipoEndereco_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoTipoEndereco(record);
		}
	},

	telaCadastroTipoEndereco_btnExcluirTipoEndereco_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroTipoEndereco().getComponent('gridTipoEndereco').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroTipoEndereco().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroTipoEnderecoController.php?op=excluir',
							params: {
								cdTipoEndereco: record[0].get('CD_TIPO_ENDERECO')	
							},
							success: function(response) {
								controller.getTelaCadastroTipoEndereco().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarTipoEndereco();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroTipoEndereco().setLoading(false);
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
	
	telaCadastroTipoEndereco_btnAtualizarLista_click: function(button) {
		this.pesquisarTipoEndereco();	
	},	
	
	telaCadastroTipoEndereco_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroTipoEndereco().getComponent('panPesquisaTipoEndereco').isHidden()) {
			this.getTelaCadastroTipoEndereco().getComponent('panPesquisaTipoEndereco').setVisible(true);
		} else {
			this.getTelaCadastroTipoEndereco().getComponent('panPesquisaTipoEndereco').setVisible(false);
		}
	},

	telaCadastroTipoEnderecoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroTipoEnderecoTipoEnderecoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroTipoEndereco.TipoEnderecoModel');
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
				url: '../erp/controller/Cadastro/CadastroTipoEnderecoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarTipoEndereco();
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

	CadastroTipoEndereco_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarTipoEndereco();
	},
	
	CadastroTipoEndereco_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroTipoEndereco().getComponent('panPesquisaTipoEndereco').getComponent('edtDsTipoEnderecoPesquisa').setValue('');
		this.pesquisarTipoEndereco();
	}
	
});