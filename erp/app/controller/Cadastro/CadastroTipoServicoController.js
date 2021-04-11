Ext.define('erp.controller.Cadastro.CadastroTipoServicoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroTipoServico.TipoServicoStore'
    ],
	views: [
		'Cadastro.CadastroTipoServico.TelaCadastroTipoServico',
		'Cadastro.CadastroTipoServico.TelaCadastroTipoServicoEdit',
		'Cadastro.CadastroTipoServico.GridTipoServico'
    ],
    refs: [
        {
            ref: 'telaCadastroTipoServico',
            selector: 'telaCadastroTipoServico'
        },
        {
            ref: 'telaCadastroTipoServicoEdit',
            selector: 'telaCadastroTipoServicoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroTipoServico': {
				afterrender: this.telaCadastroTipoServico_afterrender,
				beforedestroy: this.telaCadastroTipoServico_beforedestroy
            },
			'telaCadastroTipoServico #btnNovoTipoServico': {
				click: this.telaCadastroTipoServico_btnNovoTipoServico_click
			},
			'telaCadastroTipoServico #btnEditarTipoServico': {
				click: this.telaCadastroTipoServico_btnEditarTipoServico_click
			},	
			'telaCadastroTipoServico #gridTipoServico': {
				itemdblclick: this.telaCadastroTipoServico_gridTipoServico_itemdblclick
			},
			'telaCadastroTipoServico #btnExcluirTipoServico': {
				click: this.telaCadastroTipoServico_btnExcluirTipoServico_click
			},
			'telaCadastroTipoServico #btnAtualizarLista': {
				click: this.telaCadastroTipoServico_btnAtualizarLista_click
			},
			'telaCadastroTipoServico #btnFiltroPesquisa': {
				click: this.telaCadastroTipoServico_btnFiltroPesquisa_click
			},	
			'telaCadastroTipoServicoEdit #btnSalvar': {
				click: this.telaCadastroTipoServicoEdit_btnSalvar_click
			},
			'telaCadastroTipoServico #btnPesquisarPesquisa': {
				click: this.CadastroTipoServico_btnPesquisarPesquisa_click
			},
			'telaCadastroTipoServico #btnLimparPesquisa': {
				click: this.CadastroTipoServico_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarTipoServico: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroTipoServicoTipoServicoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroTipoServicoController.php?op=getListaTipoServico&dsTipoServico='+controller.getTelaCadastroTipoServico().getComponent('panPesquisaTipoServico').getComponent('edtDsTipoServicoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroTipoServico().setLoading('Aguarde...');
		
		controller.getTelaCadastroTipoServico().getComponent('gridTipoServico').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroTipoServico().getComponent('gridTipoServico') != undefined) {
					controller.getTelaCadastroTipoServico().getComponent('gridTipoServico').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroTipoServicoTipoServicoStoreStore().removeAll();
			}
			controller.getTelaCadastroTipoServico().setLoading(false);
		});
			
	},	
	
	telaCadastroTipoServico_afterrender: function(panel) {
		this.pesquisarTipoServico();
	},
	
	telaCadastroTipoServico_beforedestroy: function(panel) {
		this.getCadastroCadastroTipoServicoTipoServicoStoreStore().removeAll();
	},

	telaCadastroTipoServico_btnNovoTipoServico_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroTipoServico.TelaCadastroTipoServicoEdit').show();
		
		this.getTelaCadastroTipoServicoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroTipoServicoEdit().down('form').getComponent('edtDsTipoServico').focus(false,300); 
	},

	prepararEdicaoTipoServico: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroTipoServico.TelaCadastroTipoServicoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroTipoServicoEdit().down('form').getComponent('edtDsTipoServico').focus(false,300);	
	},	
	
	telaCadastroTipoServico_btnEditarTipoServico_click: function(button) {
		var record = this.getTelaCadastroTipoServico().getComponent('gridTipoServico').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoTipoServico(record[0]);
		}
	},

	telaCadastroTipoServico_gridTipoServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoTipoServico(record);
		}
	},

	telaCadastroTipoServico_btnExcluirTipoServico_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroTipoServico().getComponent('gridTipoServico').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroTipoServico().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroTipoServicoController.php?op=excluir',
							params: {
								cdTipoServico: record[0].get('CD_TIPO_SERVICO')	
							},
							success: function(response) {
								controller.getTelaCadastroTipoServico().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarTipoServico();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroTipoServico().setLoading(false);
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
	
	telaCadastroTipoServico_btnAtualizarLista_click: function(button) {
		this.pesquisarTipoServico();	
	},	
	
	telaCadastroTipoServico_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroTipoServico().getComponent('panPesquisaTipoServico').isHidden()) {
			this.getTelaCadastroTipoServico().getComponent('panPesquisaTipoServico').setVisible(true);
		} else {
			this.getTelaCadastroTipoServico().getComponent('panPesquisaTipoServico').setVisible(false);
		}
	},

	telaCadastroTipoServicoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroTipoServicoTipoServicoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroTipoServico.TipoServicoModel');
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
				url: '../erp/controller/Cadastro/CadastroTipoServicoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarTipoServico();
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

	CadastroTipoServico_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarTipoServico();
	},
	
	CadastroTipoServico_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroTipoServico().getComponent('panPesquisaTipoServico').getComponent('edtDsTipoServicoPesquisa').setValue('');
		this.pesquisarTipoServico();
	}
	
});