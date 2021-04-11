Ext.define('erp.controller.Configuracao.ConfigGeral.CadastroFuncionalidadeController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Configuracao.ConfigGeral.CadastroFuncionalidade.FuncionalidadeStore'
    ],
	views: [
		'Configuracao.ConfigGeral.CadastroFuncionalidade.TelaCadastroFuncionalidade',
		'Configuracao.ConfigGeral.CadastroFuncionalidade.TelaCadastroFuncionalidadeEdit',
		'Configuracao.ConfigGeral.CadastroFuncionalidade.GridFuncionalidade'
    ],
    refs: [
        {
            ref: 'telaCadastroFuncionalidade',
            selector: 'telaCadastroFuncionalidade'
        },
        {
            ref: 'telaCadastroFuncionalidadeEdit',
            selector: 'telaCadastroFuncionalidadeEdit'
        }
    ],
 
    init: function() {
		
        this.control({
			/*eventos da tela telaCadastroFuncionalidade*/
            'telaCadastroFuncionalidade': {
				afterrender: this.telaCadastroFuncionalidade_afterrender,
				beforedestroy: this.telaCadastroFuncionalidade_beforedestroy
            },
			'telaCadastroFuncionalidade #btnNovaFuncionalidade': {
				click: this.telaCadastroFuncionalidade_btnNovaFuncionalidade_click
			},
			'telaCadastroFuncionalidade #btnEditarFuncionalidade': {
				click: this.telaCadastroFuncionalidade_btnEditarFuncionalidade_click
			},
			'telaCadastroFuncionalidade #gridFuncionalidade': {
				itemdblclick: this.telaCadastroFuncionalidade_gridFuncionalidade_itemdblclick
			},
			'telaCadastroFuncionalidade #btnExcluirFuncionalidade': {
				click: this.telaCadastroFuncionalidade_btnExcluirFuncionalidade_click
			},
			'telaCadastroFuncionalidade #btnAtualizarLista': {
				click: this.telaCadastroFuncionalidade_btnAtualizarLista_click
			},
			'telaCadastroFuncionalidade #btnFiltroPesquisa': {
				click: this.telaCadastroFuncionalidade_btnFiltroPesquisa_click
			},
			'telaCadastroFuncionalidade #btnPesquisarPesquisa': {
				click: this.telaCadastroFuncionalidade_btnPesquisarPesquisa_click
			},
			'telaCadastroFuncionalidade #btnLimparPesquisa': {
				click: this.telaCadastroFuncionalidade_btnLimparPesquisa_click
			},
			/*eventos da tela telaCadastroFuncionalidadeEdit*/
			'telaCadastroFuncionalidadeEdit #btnSalvar': {
				click: this.telaCadastroFuncionalidadeEdit_btnSalvar_click
			}
        })
    },
	

	pesquisarFuncionalidade: function(recordSelecionado) {
		
		//Prepara para efetuar a pesquisa
		var controller = this,
		store = this.getConfiguracaoConfigGeralCadastroFuncionalidadeFuncionalidadeStoreStore(),
		prx = store.getProxy();
		
		//Atribuindo o(s) parâmetro(s) de pesquisa
		var cdFuncionalidade = controller.getTelaCadastroFuncionalidade().getComponent('panPesquisaFuncionalidade').getComponent('edtCdFuncionalidadePesquisa').getValue(),
		dsFuncionalidade = controller.getTelaCadastroFuncionalidade().getComponent('panPesquisaFuncionalidade').getComponent('edtDsFuncionalidadePesquisa').getValue();
		
		if (cdFuncionalidade == null) {
			cdFuncionalidade = '';
		}
		if (dsFuncionalidade == null) {
			dsFuncionalidade = '';
		}
		
		Ext.apply(prx, { url: '../erp/controller/Configuracao/ConfigGeral/CadastroFuncionalidadeController.php?op=getListaFuncionalidade&cdFuncionalidade='+cdFuncionalidade 
		                                                                                                   +'&dsFuncionalidade='+dsFuncionalidade  
																										   });
		store.setProxy(prx);
		
		//Efetua a pesquisa com o(s) parâmetro(s) informado(s)
		controller.getTelaCadastroFuncionalidade().setLoading('Aguarde...');	
		controller.getTelaCadastroFuncionalidade().getComponent('gridFuncionalidade').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
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
		//Após carregar os registros
		store.on('load', function handleLoad(st, records, successful, eOpts) {	
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroFuncionalidade().getComponent('gridFuncionalidade') != undefined) {
					controller.getTelaCadastroFuncionalidade().getComponent('gridFuncionalidade').getSelectionModel().select(0); 
				}
			}
			controller.getTelaCadastroFuncionalidade().setLoading(false);
		});
			
	},
	
	telaCadastroFuncionalidade_afterrender: function(panel) {
		this.pesquisarFuncionalidade();
	},
	
	telaCadastroFuncionalidade_beforedestroy: function(panel) {
		this.getConfiguracaoConfigGeralCadastroFuncionalidadeFuncionalidadeStoreStore().removeAll();
	},
	
	telaCadastroFuncionalidade_btnNovaFuncionalidade_click: function(button) {
		Ext.create('erp.view.Configuracao.ConfigGeral.CadastroFuncionalidade.TelaCadastroFuncionalidadeEdit').show();
		
		this.getTelaCadastroFuncionalidadeEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroFuncionalidadeEdit().down('form').getComponent('ckbSnAtivo').setReadOnly(true);
		this.getTelaCadastroFuncionalidadeEdit().down('form').getComponent('edtDsFuncionalidade').focus(false,300); 

	},
	
	prepararEdicaoFuncionalidade: function(record) {
		
		var controller = this;
		var win = Ext.create('erp.view.Configuracao.ConfigGeral.CadastroFuncionalidade.TelaCadastroFuncionalidadeEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);

		this.getTelaCadastroFuncionalidadeEdit().down('form').getComponent('edtDsFuncionalidade').focus(false,300);
		win.editMode = true;			
	},
	
	telaCadastroFuncionalidade_btnEditarFuncionalidade_click: function(button) {
		var record = this.getTelaCadastroFuncionalidade().getComponent('gridFuncionalidade').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoFuncionalidade(record[0]);
		}
	},
	
	telaCadastroFuncionalidade_gridFuncionalidade_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoFuncionalidade(record);
		}
	},
	
	telaCadastroFuncionalidade_btnExcluirFuncionalidade_click: function(button) {
		var controller = this,
		store = controller.getConfiguracaoConfigGeralCadastroFuncionalidadeFuncionalidadeStoreStore(),
		record = controller.getTelaCadastroFuncionalidade().getComponent('gridFuncionalidade').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroFuncionalidade().setLoading('Aguarde...');
						store.remove(record[0]);
						store.sync({
							success: function(response) {
								controller.getTelaCadastroFuncionalidade().setLoading(false);
							},
							failure: function(response) {
								controller.getTelaCadastroFuncionalidade().setLoading(false);
								controller.pesquisarFuncionalidade();
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
		
	telaCadastroFuncionalidade_btnAtualizarLista_click: function(button) {
		this.pesquisarFuncionalidade();	
	},
	
	telaCadastroFuncionalidade_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroFuncionalidade().getComponent('panPesquisaFuncionalidade').isHidden()) {
			this.getTelaCadastroFuncionalidade().getComponent('panPesquisaFuncionalidade').setVisible(true);
		} else {
			this.getTelaCadastroFuncionalidade().getComponent('panPesquisaFuncionalidade').setVisible(false);
		}
	},
	
	telaCadastroFuncionalidade_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarFuncionalidade();
	},
	
	telaCadastroFuncionalidade_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroFuncionalidade().getComponent('panPesquisaFuncionalidade').getComponent('edtCdFuncionalidadePesquisa').setValue('');
		this.getTelaCadastroFuncionalidade().getComponent('panPesquisaFuncionalidade').getComponent('edtDsFuncionalidadePesquisa').setValue('');
		this.pesquisarFuncionalidade();
	},
	
	telaCadastroFuncionalidadeEdit_btnSalvar_click: function(button) {
	
		var controller = this,
		store = this.getConfiguracaoConfigGeralCadastroFuncionalidadeFuncionalidadeStoreStore(),
		win = button.up('window'),
		form = win.down('form').getForm(),
		record = form.getRecord(),
		values = form.getValues(false,false,false,false);
		
		if (form.isValid()) {
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (!win.editMode) {
				record = Ext.create('erp.model.Configuracao.ConfigGeral.CadastroFuncionalidade.FuncionalidadeModel');
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
							controller.pesquisarFuncionalidade();
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
		
	}
	
});