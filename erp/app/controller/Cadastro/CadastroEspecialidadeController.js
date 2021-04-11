Ext.define('erp.controller.Cadastro.CadastroEspecialidadeController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroEspecialidade.EspecialidadeStore'
    ],
	views: [
		'Cadastro.CadastroEspecialidade.TelaCadastroEspecialidade',
		'Cadastro.CadastroEspecialidade.TelaCadastroEspecialidadeEdit',
		'Cadastro.CadastroEspecialidade.GridEspecialidade'
    ],
    refs: [
        {
            ref: 'telaCadastroEspecialidade',
            selector: 'telaCadastroEspecialidade'
        },
        {
            ref: 'telaCadastroEspecialidadeEdit',
            selector: 'telaCadastroEspecialidadeEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroEspecialidade': {
				afterrender: this.telaCadastroEspecialidade_afterrender,
				beforedestroy: this.telaCadastroEspecialidade_beforedestroy
            },
			'telaCadastroEspecialidade #btnNovoEspecialidade': {
				click: this.telaCadastroEspecialidade_btnNovoEspecialidade_click
			},
			'telaCadastroEspecialidade #btnEditarEspecialidade': {
				click: this.telaCadastroEspecialidade_btnEditarEspecialidade_click
			},	
			'telaCadastroEspecialidade #gridEspecialidade': {
				itemdblclick: this.telaCadastroEspecialidade_gridEspecialidade_itemdblclick
			},
			'telaCadastroEspecialidade #btnExcluirEspecialidade': {
				click: this.telaCadastroEspecialidade_btnExcluirEspecialidade_click
			},
			'telaCadastroEspecialidade #btnAtualizarLista': {
				click: this.telaCadastroEspecialidade_btnAtualizarLista_click
			},
			'telaCadastroEspecialidade #btnFiltroPesquisa': {
				click: this.telaCadastroEspecialidade_btnFiltroPesquisa_click
			},	
			'telaCadastroEspecialidadeEdit #btnSalvar': {
				click: this.telaCadastroEspecialidadeEdit_btnSalvar_click
			},
			'telaCadastroEspecialidade #btnPesquisarPesquisa': {
				click: this.CadastroEspecialidade_btnPesquisarPesquisa_click
			},
			'telaCadastroEspecialidade #btnLimparPesquisa': {
				click: this.CadastroEspecialidade_btnLimparPesquisa_click
			}
        })   
    },
	
	pesquisarEspecialidade: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroEspecialidadeEspecialidadeStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroEspecialidadeController.php?op=getListaEspecialidade&dsEspecialidade='+controller.getTelaCadastroEspecialidade().getComponent('panPesquisaEspecialidade').getComponent('edtDsEspecialidadePesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroEspecialidade().setLoading('Aguarde...');
		
		controller.getTelaCadastroEspecialidade().getComponent('gridEspecialidade').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroEspecialidade().getComponent('gridEspecialidade') != undefined) {
					controller.getTelaCadastroEspecialidade().getComponent('gridEspecialidade').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroEspecialidadeEspecialidadeStoreStore().removeAll();
			}
			controller.getTelaCadastroEspecialidade().setLoading(false);
		});
			
	},	
	
	telaCadastroEspecialidade_afterrender: function(panel) {
		this.pesquisarEspecialidade();
	},
	
	telaCadastroEspecialidade_beforedestroy: function(panel) {
		this.getCadastroCadastroEspecialidadeEspecialidadeStoreStore().removeAll();
	},

	telaCadastroEspecialidade_btnNovoEspecialidade_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroEspecialidade.TelaCadastroEspecialidadeEdit').show();
		
		this.getTelaCadastroEspecialidadeEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroEspecialidadeEdit().down('form').getComponent('edtDsEspecialidade').focus(false,300); 
	},

	prepararEdicaoEspecialidade: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroEspecialidade.TelaCadastroEspecialidadeEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		this.getTelaCadastroEspecialidadeEdit().down('form').getComponent('edtDsEspecialidade').focus(false,300);	
	},	
	
	telaCadastroEspecialidade_btnEditarEspecialidade_click: function(button) {
		var record = this.getTelaCadastroEspecialidade().getComponent('gridEspecialidade').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoEspecialidade(record[0]);
		}
	},

	telaCadastroEspecialidade_gridEspecialidade_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoEspecialidade(record);
		}
	},

	telaCadastroEspecialidade_btnExcluirEspecialidade_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroEspecialidade().getComponent('gridEspecialidade').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroEspecialidade().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroEspecialidadeController.php?op=excluir',
							params: {
								cdEspecialidade: record[0].get('CD_ESPECIALIDADE')	
							},
							success: function(response) {
								controller.getTelaCadastroEspecialidade().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarEspecialidade();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroEspecialidade().setLoading(false);
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
	
	telaCadastroEspecialidade_btnAtualizarLista_click: function(button) {
		this.pesquisarEspecialidade();	
	},	
	
	telaCadastroEspecialidade_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroEspecialidade().getComponent('panPesquisaEspecialidade').isHidden()) {
			this.getTelaCadastroEspecialidade().getComponent('panPesquisaEspecialidade').setVisible(true);
		} else {
			this.getTelaCadastroEspecialidade().getComponent('panPesquisaEspecialidade').setVisible(false);
		}
	},

	telaCadastroEspecialidadeEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getCadastroCadastroEspecialidadeEspecialidadeStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroEspecialidade.EspecialidadeModel');
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
				url: '../erp/controller/Cadastro/CadastroEspecialidadeController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarEspecialidade();
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

	CadastroEspecialidade_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarEspecialidade();
	},
	
	CadastroEspecialidade_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroEspecialidade().getComponent('panPesquisaEspecialidade').getComponent('edtDsEspecialidadePesquisa').setValue('');
		this.pesquisarEspecialidade();
	}
	
});