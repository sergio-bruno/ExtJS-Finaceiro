Ext.define('erp.controller.Cadastro.CadastroSetorController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroSetor.SetorStore'
    ],
	views: [
		'Cadastro.CadastroSetor.TelaCadastroSetor',
		'Cadastro.CadastroSetor.TelaCadastroSetorEdit',
		'Cadastro.CadastroSetor.GridSetor'
    ],
    refs: [
        {
            ref: 'telaCadastroSetor',
            selector: 'telaCadastroSetor'
        },
        {
            ref: 'telaCadastroSetorEdit',
            selector: 'telaCadastroSetorEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroSetor': {
				afterrender: this.telaCadastroSetor_afterrender,
				beforedestroy: this.telaCadastroSetor_beforedestroy
            },
			'telaCadastroSetor #btnNovoSetor': {
				click: this.telaCadastroSetor_btnNovoSetor_click
			},
			'telaCadastroSetor #btnEditarSetor': {
				click: this.telaCadastroSetor_btnEditarSetor_click
			},	
			'telaCadastroSetor #gridSetor': {
				itemdblclick: this.telaCadastroSetor_gridSetor_itemdblclick
			},
			'telaCadastroSetor #btnExcluirSetor': {
				click: this.telaCadastroSetor_btnExcluirSetor_click
			},
			'telaCadastroSetor #btnAtualizarLista': {
				click: this.telaCadastroSetor_btnAtualizarLista_click
			},
			'telaCadastroSetor #btnFiltroPesquisa': {
				click: this.telaCadastroSetor_btnFiltroPesquisa_click
			},	
			'telaCadastroSetorEdit #btnSalvar': {
				click: this.telaCadastroSetorEdit_btnSalvar_click
			},
			'telaCadastroSetor #btnPesquisarPesquisa': {
				click: this.CadastroSetor_btnPesquisarPesquisa_click
			},
			'telaCadastroSetor #btnLimparPesquisa': {
				click: this.CadastroSetor_btnLimparPesquisa_click
			}			
        })   
    },

	pesquisarSetor: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroSetorSetorStoreStore();
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroSetorController.php?op=getListaSetor&dsSetor='+controller.getTelaCadastroSetor().getComponent('panPesquisaSetor').getComponent('edtDsSetorPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroSetor().setLoading('Aguarde...');
		
		controller.getTelaCadastroSetor().getComponent('gridSetor').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.load(
			{
				page: 1,
				callback: function(records, operation, success) {
					if (!success) {
						Ext.msgbox.msg('Erro', '<i>'+operation.getError().statusText+'</i>', 'E', 8000);
					} 
				}
			}
		);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroSetor().getComponent('gridSetor') != undefined) {
					controller.getTelaCadastroSetor().getComponent('gridSetor').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroSetorSetorStoreStore().removeAll();
			}
			controller.getTelaCadastroSetor().setLoading(false);
		});
	},	
	
	telaCadastroSetor_afterrender: function(panel) {
		this.pesquisarSetor();
	},
	
	telaCadastroSetor_beforedestroy: function(panel) {
		this.getCadastroCadastroSetorSetorStoreStore().removeAll();
	},

	telaCadastroSetor_btnNovoSetor_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroSetor.TelaCadastroSetorEdit').show();
		
		this.getTelaCadastroSetorEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroSetorEdit().down('form').getComponent('ckbSnAtivo').setReadOnly(true);
		this.getTelaCadastroSetorEdit().down('form').getComponent('edtDsSetor').focus(false,300); 
	},

	prepararEdicaoSetor: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroSetor.TelaCadastroSetorEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroSetorEdit().down('form').getComponent('edtDsSetor').focus(false,300);	
		win.editMode = true;
	},	
	
	telaCadastroSetor_btnEditarSetor_click: function(button) {
		var record = this.getTelaCadastroSetor().getComponent('gridSetor').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoSetor(record[0]);
		}
	},

	telaCadastroSetor_gridSetor_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoSetor(record);
		}
	},

	telaCadastroSetor_btnExcluirSetor_click: function(button) {
		var controller = this,
		store = controller.getCadastroCadastroSetorSetorStoreStore(),
		record = controller.getTelaCadastroSetor().getComponent('gridSetor').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroSetor().setLoading('Aguarde...');
						store.remove(record[0]);
						store.sync({
							success: function(response) {
								controller.getTelaCadastroSetor().setLoading(false);
							},
							failure: function(response) {
								controller.getTelaCadastroSetor().setLoading(false);
								controller.pesquisarSetor();
								if (response.exceptions[0].getError().status == 'business') {
									Ext.msgbox.msg('Atenção', response.exceptions[0].getError().statusText, 'W', 8000);
								} else {
									Ext.msgbox.msg('Erro', '<i>'+response.exceptions[0].getError().statusText+'</i>', 'E', 8000);
								}	
							},
						});
					};
				 },
				 icon: Ext.Msg.QUESTION
			});
		}
	},
	
	telaCadastroSetor_btnAtualizarLista_click: function(button) {
		this.pesquisarSetor();	
	},	
	
	telaCadastroSetor_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroSetor().getComponent('panPesquisaSetor').isHidden()) {
			this.getTelaCadastroSetor().getComponent('panPesquisaSetor').setVisible(true);
		} else {
			this.getTelaCadastroSetor().getComponent('panPesquisaSetor').setVisible(false);
		}
	},

	telaCadastroSetorEdit_btnSalvar_click: function(button) {
		var controller = this,
		store = controller.getCadastroCadastroSetorSetorStoreStore(),
		win = button.up('window'),
		form = win.down('form').getForm(),
		record = form.getRecord(),
		values = form.getValues(false,false,false,false);
		
		if (form.isValid()) {
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (!win.editMode) {
				record = Ext.create('erp.model.Cadastro.CadastroSetor.SetorModel');
				record.set(values);
				store.add(record);
			} else {
				record.set(values);
			}		
			if (record.dirty) {	
				store.sync({
					success: function(response) {
						win.setLoading(false);
						button.setDisabled(false);
						win.close();
						if (!win.editMode){ 
							controller.pesquisarSetor();
						}	
					},
					failure: function(response) {
						win.setLoading(false);
						button.setDisabled(false);
						if (!win.editMode){
							store.remove(record);
						} else {
							record.reject();
						}
						if (response.exceptions[0].getError().status == 'business') {
							Ext.msgbox.msg('Atenção', response.exceptions[0].getError().statusText, 'W', 8000);
						} else {
							Ext.msgbox.msg('Erro', '<i>'+response.exceptions[0].getError().statusText+'</i>', 'E', 8000);
						}	
					},
				});	
			} else {
				win.close();
			}
	 	}
	},

	CadastroSetor_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarSetor();
	},
	
	CadastroSetor_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroSetor().getComponent('panPesquisaSetor').getComponent('edtDsSetorPesquisa').setValue('');
		this.pesquisarSetor();
	}
	
});