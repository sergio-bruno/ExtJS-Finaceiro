Ext.define('erp.controller.Financeiro.FinanceiroContaPagarController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Financeiro.FinanceiroContaPagar.ContaPagarStore',
		'Generico.PessoaPjStore',
		'Generico.PessoaStore',
		'Generico.PlanoContaSinteticoDebitoStore'
    ],
	views: [
		'Financeiro.FinanceiroContaPagar.TelaFinanceiroContaPagar',
		'Financeiro.FinanceiroContaPagar.TelaFinanceiroContaPagarEdit',
		'Financeiro.FinanceiroContaPagar.GridContaPagar'
    ],
    refs: [
        {
            ref: 'telaFinanceiroContaPagar',
            selector: 'telaFinanceiroContaPagar'
        },
        {
            ref: 'telaFinanceiroContaPagarEdit',
            selector: 'telaFinanceiroContaPagarEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaFinanceiroContaPagar': {
				afterrender: this.telaFinanceiroContaPagar_afterrender,
				beforedestroy: this.telaFinanceiroContaPagar_beforedestroy
            },
			'telaFinanceiroContaPagar #btnNovoContaPagar': {
				click: this.telaFinanceiroContaPagar_btnNovoContaPagar_click
			},
			'telaFinanceiroContaPagar #btnEditarContaPagar': {
				click: this.telaFinanceiroContaPagar_btnEditarContaPagar_click
			},	
			'telaFinanceiroContaPagar #gridContaPagar': {
				itemdblclick: this.telaFinanceiroContaPagar_gridContaPagar_itemdblclick
			},
			'telaFinanceiroContaPagar #btnExcluirContaPagar': {
				click: this.telaFinanceiroContaPagar_btnExcluirContaPagar_click
			},
			'telaFinanceiroContaPagar #btnAtualizarLista': {
				click: this.telaFinanceiroContaPagar_btnAtualizarLista_click
			},
			'telaFinanceiroContaPagar #btnFiltroPesquisa': {
				click: this.telaFinanceiroContaPagar_btnFiltroPesquisa_click
			},	
			'telaFinanceiroContaPagar #btnPesquisarPesquisa': {
				click: this.telaFinanceiroContaPagar_btnPesquisarPesquisa_click
			},
			'telaFinanceiroContaPagar #btnLimparPesquisa': {
				click: this.telaFinanceiroContaPagar_btnLimparPesquisa_click
			},
			
			// ações de edição
			'telaFinanceiroContaPagarEdit #btnSalvar': {
				click: this.telaFinanceiroContaPagarEdit_btnSalvar_click
			},
			'telaFinanceiroContaPagarEdit #btnSair': {
				click: this.telaFinanceiroContaPagarEdit_btnSair_click
			},
			'telaFinanceiroContaPagarEdit #btnLiquidar': {
				click: this.telaFinanceiroContaPagarEdit_btnLiquidar_click
			},
			'telaFinanceiroContaPagarEdit #btnCancelar': {
				click: this.telaFinanceiroContaPagarEdit_btnCancelar_click
			},
			'telaFinanceiroContaPagarEdit #btnDevolver': {
				click: this.telaFinanceiroContaPagarEdit_btnDevolver_click
			},
			'telaFinanceiroContaPagarEdit #btnNegativar': {
				click: this.telaFinanceiroContaPagarEdit_btnNegativar_click
			},
			'telaFinanceiroContaPagarEdit #btnAbrir': {
				click: this.telaFinanceiroContaPagarEdit_btnAbrir_click
			},
			
			// Ajustes nos campos associados a combos
			'telaFinanceiroContaPagarEdit #cboCdPessoaPj': {
				change: this.telaFinanceiroContaPagarEdit_cboCdPessoaPj_change
			},
			'telaFinanceiroContaPagarEdit #cboCdPessoa': {
				change: this.telaFinanceiroContaPagarEdit_cboCdPessoa_change
			},
			'telaFinanceiroContaPagarEdit #cboCdPlanoConta': {
				change: this.telaFinanceiroContaPagarEdit_cboCdPlanoConta_change
			},
			
			// Calcular o valor liquido 
			'telaFinanceiroContaPagarEdit #edtVlConta': {
				change: this.telaFinanceiroContaPagarEdit_edtVlConta_change
			},
			'telaFinanceiroContaPagarEdit #edtVlMoraJuro': {
				change: this.telaFinanceiroContaPagarEdit_edtVlMoraJuro_change
			},
			'telaFinanceiroContaPagarEdit #edtVlDespesa': {
				change: this.telaFinanceiroContaPagarEdit_edtVlDespesa_change
			},
			'telaFinanceiroContaPagarEdit #edtVlDesconto': {
				change: this.telaFinanceiroContaPagarEdit_edtVlDesconto_change
			}
        })   
    },
	
    telaFinanceiroContaPagarEdit_btnLiquidar_click: function(button) {
    	this.baixaAcao('L');
	},
    
    telaFinanceiroContaPagarEdit_btnCancelar_click: function(button) {
    	this.baixaAcao('C');
	},
	
    telaFinanceiroContaPagarEdit_btnDevolver_click: function(button) {
    	this.baixaAcao('D');
    },
	
    telaFinanceiroContaPagarEdit_btnNegativar_click: function(button) {
    	this.baixaAcao('N');
	},
	
    telaFinanceiroContaPagarEdit_btnAbrir_click: function(button) {
    	this.baixaAcao('A');
    },
	
	baixaAcao: function(novaSituacao) {
		var controller = this;
		var cdContaPagar = this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdContaPagar').getValue(); 
		var dsContaPagar = this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsContaPagar').getValue(); 
		if (cdContaPagar != null) {
			var tipoBaixa = "";
			var respBaixa = "";
			if ( novaSituacao == 'L') {
				tipoBaixa = 'liquidar';
				respBaixa = 'Liquidada';
			} else if ( novaSituacao == 'C') {
				tipoBaixa = 'cancelar';
				respBaixa = 'Cancelada';
			} else if ( novaSituacao == 'D') {
				tipoBaixa = 'devolver';
				respBaixa = 'Devolvida';
			} else if ( novaSituacao == 'N') {
				tipoBaixa = 'negativar';
				respBaixa = 'Negativada';
			} else if ( novaSituacao == 'A') {
				tipoBaixa = 'abrir';
				respBaixa = 'Aberta';
			}
			
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: "Deseja realmente "+tipoBaixa+" esta conta: "+dsContaPagar+"?",
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaFinanceiroContaPagarEdit().setLoading('Aguarde...');

						Ext.Ajax.request({
							url: '../erp/controller/Financeiro/FinanceiroContaPagarController.php?op=baixar',
							params: {
								cdContaPagar: cdContaPagar,
								novaSituacao: novaSituacao
							},
							success: function(response) {
								controller.getTelaFinanceiroContaPagarEdit().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarContaPagar();
									controller.getTelaFinanceiroContaPagarEdit().setLoading(false);
									controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdSituacao').setValue(novaSituacao);
									controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsSituacao').setValue(respBaixa);
									Ext.msgbox.msg('Informação', 'Conta '+respBaixa+' com êxito...', 'I', 5000);
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao realizar a ação no registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaFinanceiroContaPagarEdit().setLoading(false);
								Ext.msgbox.msg('Erro', 'Ocorreu um erro ao realizar a ação no registro selecionado:</br></br><i>'+response.responseText+'</i>', 'E', 8000);
							},
							method: 'post'
						});
					};
				 },
				 icon: Ext.Msg.QUESTION
			});
		} else {
			Ext.msgbox.msg('Atenção', 'É necessário selecionar uma conta válida...', 'W', 5000);	
		}
	},	
    
    telaFinanceiroContaPagarEdit_edtVlConta_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaFinanceiroContaPagarEdit_edtVlMoraJuro_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaFinanceiroContaPagarEdit_edtVlDespesa_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaFinanceiroContaPagarEdit_edtVlDesconto_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	totalLiquidoConta: function() {
    	var total = parseFloat(this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtVlConta').getValue()) +
			parseFloat(this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtVlMoraJuro').getValue()) +
			parseFloat(this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtVlDespesa').getValue()) -
			parseFloat(this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtVlDesconto').getValue());
    	this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtVlLiquidacao').setValue(total);
	},
	
    telaFinanceiroContaPagarEdit_cboCdPessoaPj_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdPessoaPj').setValue(newValue);
	},
    
    telaFinanceiroContaPagarEdit_cboCdPessoa_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdPessoa').setValue(newValue);
	},

	telaFinanceiroContaPagarEdit_cboCdPlanoConta_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdPlanoConta').setValue(newValue);
	},
	
	prepararEdicaoContaPagar: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Financeiro.FinanceiroContaPagar.TelaFinanceiroContaPagarEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		
		// Combo de pessoa pj
		if (record.get('CD_PESSOA_PJ') == null) {
			record.set('CD_PESSOA_PJ',-1);
		}
		var storePessoaPj = controller.getGenericoPessoaPjStoreStore();
		storePessoaPj.load({params:{cdPessoaPj: record.get('CD_PESSOA_PJ')}});
		storePessoaPj.on('load',  function handleLoad(st,records) {
			if (storePessoaPj.getCount() > 0) {
				controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('cboCdPessoaPj').setValue(records[0].get('CD_PESSOA_PJ'));
				controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('cboCdPessoaPj').setRawValue(records[0].get('NM_RAZAO_SOCIAL'));
				controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdPessoaPj').setValue(records[0].get('CD_PESSOA_PJ'));
			}
			storePessoaPj.un('load',handleLoad);
			
			// Combo de pessoa
			if (record.get('CD_PESSOA') == null) {
				record.set('CD_PESSOA',-1);
			}
			var storePessoa = controller.getGenericoPessoaStoreStore();
			storePessoa.load({params:{cdPessoa: record.get('CD_PESSOA')}});
			storePessoa.on('load',  function handleLoad(st,records) {
				if (storePessoa.getCount() > 0) {
					controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('cboCdPessoa').setValue(records[0].get('CD_PESSOA'));
					controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('cboCdPessoa').setRawValue(records[0].get('NM_PESSOA'));
					controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdPessoa').setValue(records[0].get('CD_PESSOA'));
				}
				storePessoa.un('load',handleLoad);
			});	
			
			// Combo de plano de contas
			if (record.get('CD_PLANO_CONTA') == null) {
				record.set('CD_PLANO_CONTA',-1);
			}
			var storePlanoContaSinteticoDebito = controller.getGenericoPlanoContaSinteticoDebitoStoreStore();
			storePlanoContaSinteticoDebito.load({params:{cdPlanoConta: record.get('CD_PLANO_CONTA')}});
			storePlanoContaSinteticoDebito.on('load',  function handleLoad(st,records) {
				if (storePlanoContaSinteticoDebito.getCount() > 0) {
					controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('cboCdPlanoConta').setValue(records[0].get('CD_PLANO_CONTA'));
					controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('cboCdPlanoConta').setRawValue(records[0].get('DS_PLANO_CONTA'));
					controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdPlanoConta').setValue(records[0].get('CD_PLANO_CONTA'));
				}
				storePlanoContaSinteticoDebito.un('load',handleLoad);
			});
			
		});	
		
		controller.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdConta').focus(false,300);	
	},	
	
    telaFinanceiroContaPagarEdit_btnSair_click: function(button) {
		var win = button.up('window');
		win.close();
	},
    
	pesquisarContaPagar: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getFinanceiroFinanceiroContaPagarContaPagarStoreStore();
		
		var prx = store.getProxy();			
		
		//Tratamento nas datas
		var dtInicio = '';
		var dtFim = '';
		if (controller.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue() != '') {
			dtInicio = controller.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue();
		}
		if (controller.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue() != '') {
			dtFim = controller.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue();
		}
		
		// verificação qual a data para filtro
		var tipoDataPesquisa = "";
		tipoDataPesquisa = controller.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsDataPesquisa').getComponent('rdgDataPesquisa').getChecked()[0].inputValue;
		
		Ext.apply(prx, { url: '../erp/controller/Financeiro/FinanceiroContaPagarController.php'
			+ '?op=getListaContaPagar&dsContaPagar='+controller.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('edtDsContaPagarPesquisa').getValue() 
			+ '&dtInicio='+Ext.Date.format(dtInicio, 'Y-m-d')
			+ '&dtFim='+Ext.Date.format(dtFim, 'Y-m-d')
			+ '&tipoDataPesquisa='+tipoDataPesquisa
		});
		 
		store.setProxy(prx);
		controller.getTelaFinanceiroContaPagar().setLoading('Aguarde...');
		
		controller.getTelaFinanceiroContaPagar().getComponent('gridContaPagar').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaFinanceiroContaPagar().getComponent('gridContaPagar') != undefined) {
					controller.getTelaFinanceiroContaPagar().getComponent('gridContaPagar').getSelectionModel().select(0); 
				}
			} else {
				controller.getFinanceiroFinanceiroContaPagarContaPagarStoreStore().removeAll();
			}
			controller.getTelaFinanceiroContaPagar().setLoading(false);
		});
			
	},	
	
	telaFinanceiroContaPagar_afterrender: function(panel) {
		this.pesquisarContaPagar();
	},
	
	telaFinanceiroContaPagar_beforedestroy: function(panel) {
		this.getFinanceiroFinanceiroContaPagarContaPagarStoreStore().removeAll();
	},

	telaFinanceiroContaPagar_btnNovoContaPagar_click: function(button) {
		Ext.create('erp.view.Financeiro.FinanceiroContaPagar.TelaFinanceiroContaPagarEdit').show();
		
		this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdSituacao').setValue('A');
		this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsSituacao').setValue('Aberta');
		
		this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtCdConta').focus(false,300); 
	},
	
	telaFinanceiroContaPagar_btnEditarContaPagar_click: function(button) {
		var record = this.getTelaFinanceiroContaPagar().getComponent('gridContaPagar').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoContaPagar(record[0]);
		}
	},

	telaFinanceiroContaPagar_gridContaPagar_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoContaPagar(record);
		}
	},

	telaFinanceiroContaPagar_btnExcluirContaPagar_click: function(button) {
		var controller = this;
		var record = controller.getTelaFinanceiroContaPagar().getComponent('gridContaPagar').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaFinanceiroContaPagar().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Financeiro/FinanceiroContaPagarController.php?op=excluir',
							params: {
								cdContaPagar: record[0].get('CD_CONTA_PAGAR')	
							},
							success: function(response) {
								controller.getTelaFinanceiroContaPagar().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarContaPagar();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaFinanceiroContaPagar().setLoading(false);
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
	
	telaFinanceiroContaPagar_btnAtualizarLista_click: function(button) {
		this.pesquisarContaPagar();	
	},	
	
	telaFinanceiroContaPagar_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').isHidden()) {
			this.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').setVisible(true);
		} else {
			this.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').setVisible(false);
		}
	},

	telaFinanceiroContaPagarEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getFinanceiroFinanceiroContaPagarContaPagarStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Financeiro.FinanceiroContaPagar.ContaPagarModel');
		var reg = Ext.create(model, form.getValues(false,false,false,false));
		
		if (form.isValid()) {
		
			/* Ajustando o código da situação
				WHEN 'A' THEN 'Aberta'
				WHEN 'D' THEN 'Devolvida'
				WHEN 'L' THEN 'Liquidada'
				WHEN 'C' THEN 'Cancelada'
				WHEN 'N' THEN 'Negativada'
			*/
			if ( this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsSituacao').getValue() == 'Aberta' ) {
				reg.set('CD_SITUACAO','A');
			} else if ( this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsSituacao').getValue() == 'Devolvida' ) {
				reg.set('CD_SITUACAO','D');
			} else if ( this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsSituacao').getValue() == 'Liquidada' ) {
				reg.set('CD_SITUACAO','L');
			} else if ( this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsSituacao').getValue() == 'Cancelada' ) {
				reg.set('CD_SITUACAO','C');
			} else if ( this.getTelaFinanceiroContaPagarEdit().down('form').getComponent('edtDsSituacao').getValue() == 'Negativada' ) {
				reg.set('CD_SITUACAO','N');
			} 
			
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (reg.phantom) {
				var op = 'inserir';
			} else {
				var op =  'alterar';
			}
			Ext.Ajax.request({
				url: '../erp/controller/Financeiro/FinanceiroContaPagarController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						//win.close();
						controller.pesquisarContaPagar();
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

	telaFinanceiroContaPagar_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarContaPagar();
	},
	
	telaFinanceiroContaPagar_btnLimparPesquisa_click: function(button) {
		this.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('edtDsContaPagarPesquisa').setValue('');
		this.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').setValue(null);
		this.getTelaFinanceiroContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').setValue(null);
		this.pesquisarContaPagar();
	}
	
});