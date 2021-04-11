Ext.define('erp.controller.Configuracao.GestaoUsuario.CadastroPerfilController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Configuracao.GestaoUsuario.CadastroPerfil.PerfilStore',
		'Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadePerfilStore',
		'Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadeStore'
    ],
	views: [
		'Configuracao.GestaoUsuario.CadastroPerfil.TelaCadastroPerfil',
		'Configuracao.GestaoUsuario.CadastroPerfil.TelaCadastroPerfilEdit',
		'Configuracao.GestaoUsuario.CadastroPerfil.TelaFuncionalidadePerfilUsuarioEdit',
		'Configuracao.GestaoUsuario.CadastroPerfil.GridPerfil',
		'Configuracao.GestaoUsuario.CadastroPerfil.GridFuncionalidadePerfil'
    ],
    refs: [
        {
            ref: 'telaCadastroPerfil',
            selector: 'telaCadastroPerfil'
        },
        {
            ref: 'telaCadastroPerfilEdit',
            selector: 'telaCadastroPerfilEdit'
        },
        {
            ref: 'telaFuncionalidadePerfilUsuarioEdit',
            selector: 'telaFuncionalidadePerfilUsuarioEdit'
        }
    ],
 
    init: function() {
		
        this.control({
			/*eventos da tela telaCadastroPerfil*/
            'telaCadastroPerfil': {
				afterrender: this.telaCadastroPerfil_afterrender,
				beforedestroy: this.telaCadastroPerfil_beforedestroy
            },
			'telaCadastroPerfil #btnNovoPerfil': {
				click: this.telaCadastroPerfil_btnNovoPerfil_click
			},
			'telaCadastroPerfil #btnEditarPerfil': {
				click: this.telaCadastroPerfil_btnEditarPerfil_click
			},
			'telaCadastroPerfil #gridPerfil': {
				itemdblclick: this.telaCadastroPerfil_gridPerfil_itemdblclick
			},
			'telaCadastroPerfil #btnExcluirPerfil': {
				click: this.telaCadastroPerfil_btnExcluirPerfil_click
			},
			'telaCadastroPerfil #btnAtualizarLista': {
				click: this.telaCadastroPerfil_btnAtualizarLista_click
			},
			'telaCadastroPerfil #btnFiltroPesquisa': {
				click: this.telaCadastroPerfil_btnFiltroPesquisa_click
			},
			'telaCadastroPerfil #btnPesquisarPesquisa': {
				click: this.telaCadastroPerfil_btnPesquisarPesquisa_click
			},
			'telaCadastroPerfil #btnLimparPesquisa': {
				click: this.telaCadastroPerfil_btnLimparPesquisa_click
			},
			'telaCadastroPerfil #gridPerfil': {
				select: this.telaCadastroPerfil_gridPerfil_Select
			},
			/*eventos da tela telaCadastroPerfilEdit*/
			'telaCadastroPerfilEdit #btnSalvar': {
				click: this.telaCadastroPerfilEdit_btnSalvar_click
			},
			/*Eventos do cadastro das funcionalidades do perfil*/
			'telaCadastroPerfil #btnAdicionarFuncionalidadePerfil': {
				click: this.telaCadastroPerfil_btnAdicionarFuncionalidadePerfil_click
			},
			'telaCadastroPerfil #btnRemoverFuncionalidadePerfil': {
				click: this.telaCadastroPerfil_btnRemoverFuncionalidadePerfil_click
			},
			'telaCadastroPerfil #btnAtualizarListaFuncionalidadePerfil': {
				click: this.telaCadastroPerfil_btnAtualizarListaFuncionalidadePerfil_click
			},
			'telaFuncionalidadePerfilUsuarioEdit #btnSalvarFuncionalidadePerfilUsuario': {
				click: this.telaFuncionalidadePerfilUsuarioEdit_btnSalvarFuncionalidadePerfilUsuario_click
			},
			'telaFuncionalidadePerfilUsuarioEdit #cboCdFuncionalidade': {
				change: this.telaFuncionalidadePerfilUsuarioEdit_cboCdFuncionalidade_Change
			}
        })
    },
	
	telaCadastroPerfil_gridPerfil_Select: function( grid, record, index, eOpts ) {
		this.pesquisarFuncionalidadePerfilUsuario(record.get('CD_PERFIL'));
	},
	
	/*Ínicio - Eventos do cadastro das funcionalidades do perfil*/
	telaFuncionalidadePerfilUsuarioEdit_cboCdFuncionalidade_Change: function( combo, newValue, oldValue, eOpts ){
		this.getTelaFuncionalidadePerfilUsuarioEdit().down('form').getComponent('edtCdFuncionalidade').setValue(newValue);
	},

	telaCadastroPerfil_btnAdicionarFuncionalidadePerfil_click: function(button) {
		var controller = this;
		Ext.create('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.TelaFuncionalidadePerfilUsuarioEdit').show();
		if (controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil') != undefined) {
			var record = controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil').getSelectionModel().getSelection(); 
			if (record[0] != undefined) {
				controller.getTelaFuncionalidadePerfilUsuarioEdit().down('form').getComponent('edtCdPerfil').setValue(record[0].get('CD_PERFIL'));
			}
		}
		controller.getTelaFuncionalidadePerfilUsuarioEdit().down('form').getComponent('cboCdFuncionalidade').focus(false,300);	
	},
	
	telaCadastroPerfil_btnRemoverFuncionalidadePerfil_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').down('tabpanel').getComponent('gridFuncionalidadePerfil').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroPerfil().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Configuracao/GestaoUsuario/CadastroPerfilController.php?op=excluirFuncionalidadePerfilUsuario',
							params: {
								cdPerfil: record[0].get('CD_PERFIL'),
								cdFuncionalidade: record[0].get('CD_FUNCIONALIDADE')			
							},
							success: function(response) {
								controller.getTelaCadastroPerfil().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarFuncionalidadePerfilUsuario(record[0].get('CD_PERFIL'));
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroPerfil().setLoading(false);
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

	telaCadastroPerfil_btnAtualizarListaFuncionalidadePerfil_click: function(button) {
		var controller = this;
		if (controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil') != undefined) {
			var record = controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil').getSelectionModel().getSelection(); 
			if (record[0] != undefined) {
				controller.pesquisarFuncionalidadePerfilUsuario(record[0].get('CD_PERFIL'));
			}
		}
	},
	
	telaFuncionalidadePerfilUsuarioEdit_btnSalvarFuncionalidadePerfilUsuario_click: function(button) {
		var controller = this;
		var st = this.getConfiguracaoGestaoUsuarioCadastroPerfilFuncionalidadePerfilStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Configuracao.GestaoUsuario.CadastroPerfil.FuncionalidadePerfilModel');
		var reg = Ext.create(model, form.getValues());
		
		if (form.isValid()) {
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (reg.phantom) {
				var op = 'inserirFuncionalidadePerfilUsuario';
			} else {
				var op =  'alterarFuncionalidadePerfilUsuario';
			}
			Ext.Ajax.request({
				url: '../erp/controller/Configuracao/GestaoUsuario/CadastroPerfilController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarFuncionalidadePerfilUsuario(reg.get('CD_PERFIL'));
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
	/*Final - Eventos do cadastro das funcionalidades do perfil*/
	
	pesquisarFuncionalidadePerfilUsuario: function(cdPerfil) {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getConfiguracaoGestaoUsuarioCadastroPerfilFuncionalidadePerfilStoreStore();
		var prx = store.getProxy();
		
		Ext.apply(prx, { url: '../erp/controller/Configuracao/GestaoUsuario/CadastroPerfilController.php?op=getListaFuncionalidadePerfilUsuario&cdPerfil='+cdPerfil });
		
		store.setProxy(prx);
		
		store.loadPage(1);
	},	
	
	pesquisarPerfil: function() {
		
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getConfiguracaoGestaoUsuarioCadastroPerfilPerfilStoreStore();
		var prx = store.getProxy();
		
		Ext.apply(prx, { url: '../erp/controller/Configuracao/GestaoUsuario/CadastroPerfilController.php?op=getListaPerfil&cdPerfil='+controller.getTelaCadastroPerfil().getComponent('panPesquisaPerfil').getComponent('edtCdPerfilPesquisa').getValue() 
		                                                                                                   +'&dsPerfil='+controller.getTelaCadastroPerfil().getComponent('panPesquisaPerfil').getComponent('edtDsPerfilPesquisa').getValue()  
																										   });
		store.setProxy(prx);
		controller.getTelaCadastroPerfil().setLoading('Aguarde...');
		
		controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil') != undefined) {
					controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil').getSelectionModel().select(0); 
				}
			}
			controller.getTelaCadastroPerfil().setLoading(false);
		});
			
	},
	
	telaCadastroPerfil_afterrender: function(panel) {
		this.pesquisarPerfil();
	},
	
	telaCadastroPerfil_beforedestroy: function(panel) {
		this.getConfiguracaoGestaoUsuarioCadastroPerfilPerfilStoreStore().removeAll();
		this.getConfiguracaoGestaoUsuarioCadastroPerfilFuncionalidadePerfilStoreStore().removeAll();
		this.getConfiguracaoGestaoUsuarioCadastroPerfilFuncionalidadeStoreStore().removeAll();
	},
	
	telaCadastroPerfil_btnNovoPerfil_click: function(button) {
		Ext.create('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.TelaCadastroPerfilEdit').show();
		this.getTelaCadastroPerfilEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroPerfilEdit().down('form').getComponent('ckbSnAtivo').setReadOnly(true);
		this.getTelaCadastroPerfilEdit().down('form').getComponent('edtDsPerfil').focus(false,300); 
	},
	
	prepararEdicaoPerfil: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Configuracao.GestaoUsuario.CadastroPerfil.TelaCadastroPerfilEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);

		this.getTelaCadastroPerfilEdit().down('form').getComponent('edtDsPerfil').focus(false,300);	
	},
	
	telaCadastroPerfil_btnEditarPerfil_click: function(button) {
		var record = this.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoPerfil(record[0]);
		}
	},
	
	telaCadastroPerfil_gridPerfil_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoPerfil(record);
		}
	},
	
	telaCadastroPerfil_btnExcluirPerfil_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroPerfil().getComponent('panFuncionalidadePerfil').getComponent('gridPerfil').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroPerfil().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Configuracao/GestaoUsuario/CadastroPerfilController.php?op=excluir',
							params: {
								cdPerfil: record[0].get('CD_PERFIL')	
							},
							success: function(response) {
								controller.getTelaCadastroPerfil().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarPerfil();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroPerfil().setLoading(false);
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
		
	telaCadastroPerfil_btnAtualizarLista_click: function(button) {
		this.pesquisarPerfil();	
	},
	
	telaCadastroPerfil_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroPerfil().getComponent('panPesquisaPerfil').isHidden()) {
			this.getTelaCadastroPerfil().getComponent('panPesquisaPerfil').setVisible(true);
		} else {
			this.getTelaCadastroPerfil().getComponent('panPesquisaPerfil').setVisible(false);
		}
	},
	
	telaCadastroPerfil_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarPerfil();
	},
	
	telaCadastroPerfil_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroPerfil().getComponent('panPesquisaPerfil').getComponent('edtCdPerfilPesquisa').setValue('');
		this.getTelaCadastroPerfil().getComponent('panPesquisaPerfil').getComponent('edtDsPerfilPesquisa').setValue('');
		this.pesquisarPerfil();
	},
	
	telaCadastroPerfilEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getConfiguracaoGestaoUsuarioCadastroPerfilPerfilStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Configuracao.GestaoUsuario.CadastroPerfil.PerfilModel');
		var reg = Ext.create(model, form.getValues());
		
		if (form.isValid()) {
		
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (reg.phantom) {
				var op = 'inserir';
			} else {
				var op =  'alterar';
			}
			Ext.Ajax.request({
				url: '../erp/controller/Configuracao/GestaoUsuario/CadastroPerfilController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarPerfil();
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
	}
	
});