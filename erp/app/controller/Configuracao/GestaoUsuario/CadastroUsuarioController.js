Ext.define('erp.controller.Configuracao.GestaoUsuario.CadastroUsuarioController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Configuracao.GestaoUsuario.CadastroUsuario.UsuarioStore',
		'Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioStore',
		'Configuracao.GestaoUsuario.CadastroUsuario.PerfilStore'
    ],
	views: [
		'Configuracao.GestaoUsuario.CadastroUsuario.CadastroUsuario',
		'Configuracao.GestaoUsuario.CadastroUsuario.GridUsuario',
		'Configuracao.GestaoUsuario.CadastroUsuario.GridPerfilUsuario',
		'Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioEdit'
    ],
 
    init: function() {
		
        this.control({
			/*Cadastro de usuário*/
            'gestaousuario-cadastrousuario-cadastrousuario': {
				afterrender: this.gestaoUsuario_CadastroUsuario_CadastroUsuario_AfterRender,
				beforedestroy: this.gestaoUsuario_CadastroUsuario_CadastroUsuario_BeforeDestroy
            },
			'button[id=btnNovoUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				click: this.btnNovoUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click
			},
			'button[id=btnEditarUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				click: this.btnEditarUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click
			},
			'button[id=btnAlterarSenhaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				click: this.btnAlterarSenhaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click
			},
			'button[id=btnAtualizarLista_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				click: this.btnAtualizarLista_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click
			},
			'button[id=btnFiltroPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				click: this.btnFiltroPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click
			},
			'button[id=btnPesquisarPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				click: this.btnPesquisarPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click
			},
			'button[id=btnLimparPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				click: this.btnLimparPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click
			},
			'grid[id=gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario]': {
				select: this.gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Select,
				itemdblclick: this.gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_ItemDblClick
			},
			'button[id=btnSalvar_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit]': {
				click: this.btnSalvar_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit_Click
			},
			'button[id=btnSalvar_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit]': {
				click: this.btnSalvar_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit_Click
			},
			
			/*Perfil do usuário*/
			'button[id=btnAdicionarPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario]': {
				click: this.btnAdicionarPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario_Click
			},
			'button[id=btnRemoverPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario]': {
				click: this.btnRemoverPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario_Click
			},
			'button[id=btnAtualizarLista_GestaoUsuario_CadastroUsuario_GridPerfilUsuario]': {
				click: this.btnAtualizarLista_GestaoUsuario_CadastroUsuario_GridPerfilUsuario_Click
			},
			'combo[id=cboCdPerfil_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit]': {
				change: this.cboCdPerfil_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit_Change
			},
			'button[id=btnSalvar_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit]': {
				click: this.btnSalvar_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit_Click
			}
        })
    },
	
	pesquisarUsuario: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getConfiguracaoGestaoUsuarioCadastroUsuarioUsuarioStoreStore();
		var prx = store.getProxy();
		var gridUsuario = Ext.getCmp('gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario');
		
		Ext.apply(prx, { url: '../erp/controller/Configuracao/GestaoUsuario/CadastroUsuarioController.php?op=getListaUsuario&nmLogin='+Ext.getCmp('edtNmLoginPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario').getValue() 
																											   +'&nmUsuario='+Ext.getCmp('edtNmUsuarioPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario').getValue() 
																											   });
		
		store.setProxy(prx);

		Ext.getCmp('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.CadastroUsuario').setLoading('Aguarde...');
		
		gridUsuario.getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (gridUsuario != undefined) {
					gridUsuario.getSelectionModel().select(0); 
				}
			} else {
				controller.getConfiguracaoGestaoUsuarioCadastroUsuarioPerfilUsuarioStoreStore().removeAll();
			}
			Ext.getCmp('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.CadastroUsuario').setLoading(false);
		});
	},
	
	pesquisarPerfilUsuario: function(cdUsuario) {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getConfiguracaoGestaoUsuarioCadastroUsuarioPerfilUsuarioStoreStore();
		var prx = store.getProxy();
		
		Ext.apply(prx, { url: '../erp/controller/Configuracao/GestaoUsuario/CadastroUsuarioController.php?op=getListaPerfilUsuario&cdUsuario='+cdUsuario });
		
		store.setProxy(prx);
		
		store.loadPage(1);
	},
	
	gestaoUsuario_CadastroUsuario_CadastroUsuario_AfterRender: function(panel) {
		this.pesquisarUsuario();
	},
	
	gestaoUsuario_CadastroUsuario_CadastroUsuario_BeforeDestroy: function(panel) {
		this.getConfiguracaoGestaoUsuarioCadastroUsuarioUsuarioStoreStore().removeAll();
		this.getConfiguracaoGestaoUsuarioCadastroUsuarioPerfilUsuarioStoreStore().removeAll();
	},
	
	btnNovoUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click: function(button) {
		Ext.create('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.CadastroUsuarioEdit').show();
		Ext.getCmp('ckbSnAlteraSenhaProxLogon_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').setValue('S');
		Ext.getCmp('ckbSnAtivo_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').setValue('S');
		Ext.getCmp('rdgTpNivelAcesso_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').setValue({radioTpNivelAcesso: 'U'});
		Ext.getCmp('edtNmLogin_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').focus(false,300);	
	},
	
	editarUsuario: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.CadastroUsuarioEdit').show();
		//Carrega os dados no form
		win.down('form').loadRecord(record);
		Ext.getCmp('rdgTpNivelAcesso_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').setValue({radioTpNivelAcesso: record.get('TP_NIVEL_ACESSO')});
		Ext.getCmp('fdsSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').setDisabled(true);
		Ext.getCmp('edtDsSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').setValue(record.get('DS_SENHA'));
		Ext.getCmp('edtDsConfirmacaoSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').setValue(record.get('DS_SENHA'));
		Ext.getCmp('edtNmLogin_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').focus(false,300);	
	},
	
	btnAlterarSenhaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click: function(button) {
		var record = Ext.getCmp('gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.editarSenhaUsuario(record[0]);
		}
	},
	
	editarSenhaUsuario: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.TrocaSenhaUsuarioEdit').show();
		win.down('form').loadRecord(record);
		Ext.getCmp('edtDsSenha_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit').setValue(null);
		Ext.getCmp('edtDsConfirmacaoSenha_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit').setValue(null);
	},

	btnSalvar_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit_Click: function(button) {
		var controller = this;
		var st = this.getConfiguracaoGestaoUsuarioCadastroUsuarioUsuarioStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Configuracao.GestaoUsuario.CadastroUsuario.UsuarioModel');
		var reg = Ext.create(model, form.getValues());

		if (form.isValid()) {
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (Ext.getCmp('edtDsSenha_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit').getValue() != Ext.getCmp('edtDsConfirmacaoSenha_GestaoUsuario_CadastroUsuario_TrocaSenhaUsuarioEdit').getValue()) {
				win.setLoading(false);
				button.setDisabled(false);
				Ext.msgbox.msg('Atenção', 'As senhas informadas não conferem', 'W', 5000);
				return false;
			}
			Ext.Ajax.request({
				url: '../erp/controller/Configuracao/GestaoUsuario/CadastroUsuarioController.php?op=alterarSenha',
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						Ext.msgbox.msg('Informação', 'Senha alterada com êxito.', 'I', 8000);
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
	
	
	
	
	
	
	
	btnEditarUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click: function(button) {
		var record = Ext.getCmp('gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.editarUsuario(record[0]);
		}
	},
	
	btnAtualizarLista_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click: function(button) {
		this.pesquisarUsuario();
	},
	
	btnFiltroPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click: function(button) {
		if (Ext.getCmp('panPesquisaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').isHidden()) {
			Ext.getCmp('panPesquisaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').setVisible(true);
		} else {
			Ext.getCmp('panPesquisaUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').setVisible(false);
		}
	},
	
	gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_ItemDblClick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.editarUsuario(record);
		}
	},
	
	btnPesquisarPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click: function(button) {
		this.pesquisarUsuario();
	},
	
	btnLimparPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario_Click: function(button) {
		Ext.getCmp('edtNmLoginPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario').setValue('');
		Ext.getCmp('edtNmUsuarioPesquisa_GestaoUsuario_CadastroUsuario_CadastroUsuario').setValue('');
		this.pesquisarUsuario();
	},
	
	gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario_Select: function( grid, record, index, eOpts ) {
		this.pesquisarPerfilUsuario(record.get('CD_USUARIO'));
	},
	
	btnSalvar_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit_Click: function(button) {
		var controller = this;
		var st = this.getConfiguracaoGestaoUsuarioCadastroUsuarioUsuarioStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Configuracao.GestaoUsuario.CadastroUsuario.UsuarioModel');
		var reg = Ext.create(model, form.getValues());

		if (form.isValid()) {
		
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (reg.phantom) {
				if (Ext.getCmp('edtDsSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').getValue() != Ext.getCmp('edtDsConfirmacaoSenha_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').getValue()) {
					win.setLoading(false);
					button.setDisabled(false);
					Ext.msgbox.msg('Atenção', 'As senhas informadas não conferem', 'W', 5000);
					return false;
				}
				//reg.set('DS_SENHA',Ext.MD5(reg.get('DS_SENHA'))); //Encripta a senha
				var op = 'inserir';
			} else {
				var op =  'alterar';
			}
			
			/* para o nível de acesso do usuário */
			var resp = Ext.getCmp('rdgTpNivelAcesso_GestaoUsuario_CadastroUsuario_CadastroUsuarioEdit').items.get(0).getGroupValue();
			if ( resp == '' ) {
				reg.set('TP_NIVEL_ACESSO','U');
			} else {
				reg.set('TP_NIVEL_ACESSO',resp);
			}
			
			Ext.Ajax.request({
				url: '../erp/controller/Configuracao/GestaoUsuario/CadastroUsuarioController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						if (reg.phantom) {
							Ext.msgbox.msg('Informação', 'Usuário cadastrado com sucesso.', 'I', 8000);
						}
						controller.pesquisarUsuario();
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
	
	btnAdicionarPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario_Click: function(button) {
		Ext.create('erp.view.Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioEdit').show();
		if (Ext.getCmp('gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario') != undefined) {
			var record = Ext.getCmp('gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').getSelectionModel().getSelection(); 
			if (record[0] != undefined) {
				Ext.getCmp('edtCdUsuario_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit').setValue(record[0].get('CD_USUARIO'));
			}
		}
		Ext.getCmp('cboCdPerfil_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit').focus(false,300);	
	},
	
	btnRemoverPerfil_GestaoUsuario_CadastroUsuario_GridPerfilUsuario_Click: function(button) {
		var controller = this;
		var record = Ext.getCmp('gridPerfilUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						Ext.getCmp('gridPerfilUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Configuracao/GestaoUsuario/CadastroUsuarioController.php?op=excluirPerfilUsuario',
							params: {
								cdPerfil: record[0].get('CD_PERFIL'),
								cdUsuario: record[0].get('CD_USUARIO')	
							},
							success: function(response) {
								Ext.getCmp('gridPerfilUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarPerfilUsuario(record[0].get('CD_USUARIO'));
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								Ext.getCmp('gridPerfilUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').setLoading(false);
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
	
	cboCdPerfil_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit_Change: function( combo, newValue, oldValue, eOpts ){
		Ext.getCmp('edtCdPerfil_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit').setValue(newValue);
	},
	
	btnAtualizarLista_GestaoUsuario_CadastroUsuario_GridPerfilUsuario_Click: function(button) {
		if (Ext.getCmp('gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario') != undefined) {
			var record = Ext.getCmp('gridUsuario_GestaoUsuario_CadastroUsuario_CadastroUsuario').getSelectionModel().getSelection(); 
			if (record[0] != undefined) {
				this.pesquisarPerfilUsuario(record[0].get('CD_USUARIO'));
			}
		}
	},
	
	btnSalvar_GestaoUsuario_CadastroUsuario_PerfilUsuarioEdit_Click: function(button) {
		var controller = this;
		var st = this.getConfiguracaoGestaoUsuarioCadastroUsuarioPerfilUsuarioStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Configuracao.GestaoUsuario.CadastroUsuario.PerfilUsuarioModel');
		var reg = Ext.create(model, form.getValues());
		
		if (form.isValid()) {
		
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (reg.phantom) {
				var op = 'inserirPerfilUsuario';
			} else {
				/* o sistema não possui esta opção */
				var op =  'alterarPerfilUsuario';
			}
			Ext.Ajax.request({
				url: '../erp/controller/Configuracao/GestaoUsuario/CadastroUsuarioController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarPerfilUsuario(reg.get('CD_USUARIO'));
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