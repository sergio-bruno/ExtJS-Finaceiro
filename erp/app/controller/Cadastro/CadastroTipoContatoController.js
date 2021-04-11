Ext.define('erp.controller.Cadastro.CadastroTipoContatoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroTipoContato.TipoContatoStore'
    ],
	views: [
		'Cadastro.CadastroTipoContato.TelaCadastroTipoContato',
		'Cadastro.CadastroTipoContato.TelaCadastroTipoContatoEdit',
		'Cadastro.CadastroTipoContato.GridTipoContato'
    ],
    refs: [
        {
            ref: 'telaCadastroTipoContato',
            selector: 'telaCadastroTipoContato'
        },
        {
            ref: 'telaCadastroTipoContatoEdit',
            selector: 'telaCadastroTipoContatoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroTipoContato': {
				afterrender: this.telaCadastroTipoContato_afterrender,
				beforedestroy: this.telaCadastroTipoContato_beforedestroy
            },
			'telaCadastroTipoContato #btnNovoTipoContato': {
				click: this.telaCadastroTipoContato_btnNovoTipoContato_click
			},
			'telaCadastroTipoContato #btnEditarTipoContato': {
				click: this.telaCadastroTipoContato_btnEditarTipoContato_click
			},	
			'telaCadastroTipoContato #gridTipoContato': {
				itemdblclick: this.telaCadastroTipoContato_gridTipoContato_itemdblclick
			},
			'telaCadastroTipoContato #btnExcluirTipoContato': {
				click: this.telaCadastroTipoContato_btnExcluirTipoContato_click
			},
			'telaCadastroTipoContato #btnAtualizarLista': {
				click: this.telaCadastroTipoContato_btnAtualizarLista_click
			},
			'telaCadastroTipoContato #btnFiltroPesquisa': {
				click: this.telaCadastroTipoContato_btnFiltroPesquisa_click
			},	
			'telaCadastroTipoContatoEdit #btnSalvar': {
				click: this.telaCadastroTipoContatoEdit_btnSalvar_click
			},
			'telaCadastroTipoContato #btnPesquisarPesquisa': {
				click: this.CadastroTipoContato_btnPesquisarPesquisa_click
			},
			'telaCadastroTipoContato #btnLimparPesquisa': {
				click: this.CadastroTipoContato_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarTipoContato: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroTipoContatoTipoContatoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroTipoContatoController.php?op=getListaTipoContato&dsTipoContato='+controller.getTelaCadastroTipoContato().getComponent('panPesquisaTipoContato').getComponent('edtDsTipoContatoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroTipoContato().setLoading('Aguarde...');
		
		controller.getTelaCadastroTipoContato().getComponent('gridTipoContato').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroTipoContato().getComponent('gridTipoContato') != undefined) {
					controller.getTelaCadastroTipoContato().getComponent('gridTipoContato').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroTipoContatoTipoContatoStoreStore().removeAll();
			}
			controller.getTelaCadastroTipoContato().setLoading(false);
		});
			
	},	
	
	telaCadastroTipoContato_afterrender: function(panel) {
		this.pesquisarTipoContato();
	},
	
	telaCadastroTipoContato_beforedestroy: function(panel) {
		this.getCadastroCadastroTipoContatoTipoContatoStoreStore().removeAll();
	},

	telaCadastroTipoContato_btnNovoTipoContato_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroTipoContato.TelaCadastroTipoContatoEdit').show();
		
		this.getTelaCadastroTipoContatoEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroTipoContatoEdit().down('form').getComponent('edtDsTipoContato').focus(false,300); 
	},

	prepararEdicaoTipoContato: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroTipoContato.TelaCadastroTipoContatoEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroTipoContatoEdit().down('form').getComponent('edtDsTipoContato').focus(false,300);	
	},	
	
	telaCadastroTipoContato_btnEditarTipoContato_click: function(button) {
		var record = this.getTelaCadastroTipoContato().getComponent('gridTipoContato').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoTipoContato(record[0]);
		}
	},

	telaCadastroTipoContato_gridTipoContato_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoTipoContato(record);
		}
	},

	telaCadastroTipoContato_btnExcluirTipoContato_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroTipoContato().getComponent('gridTipoContato').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroTipoContato().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroTipoContatoController.php?op=excluir',
							params: {
								cdTipoContato: record[0].get('CD_TIPO_CONTATO')	
							},
							success: function(response) {
								controller.getTelaCadastroTipoContato().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarTipoContato();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroTipoContato().setLoading(false);
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
	
	telaCadastroTipoContato_btnAtualizarLista_click: function(button) {
		this.pesquisarTipoContato();	
	},	
	
	telaCadastroTipoContato_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroTipoContato().getComponent('panPesquisaTipoContato').isHidden()) {
			this.getTelaCadastroTipoContato().getComponent('panPesquisaTipoContato').setVisible(true);
		} else {
			this.getTelaCadastroTipoContato().getComponent('panPesquisaTipoContato').setVisible(false);
		}
	},

	telaCadastroTipoContatoEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroTipoContatoTipoContatoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroTipoContato.TipoContatoModel');
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
				url: '../erp/controller/Cadastro/CadastroTipoContatoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarTipoContato();
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

	CadastroTipoContato_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarTipoContato();
	},
	
	CadastroTipoContato_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroTipoContato().getComponent('panPesquisaTipoContato').getComponent('edtDsTipoContatoPesquisa').setValue('');
		this.pesquisarTipoContato();
	}
	
});