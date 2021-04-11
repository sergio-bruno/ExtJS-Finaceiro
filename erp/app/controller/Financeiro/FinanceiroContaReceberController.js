Ext.define('erp.controller.Financeiro.FinanceiroContaReceberController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Financeiro.FinanceiroContaReceber.ContaReceberStore',
		'Generico.PessoaPjStore',
		'Generico.PessoaStore',
		'Generico.PlanoContaSinteticoCreditoStore',
		'Generico.EspecieDocumentoStore'
    ],
	views: [
		'Financeiro.FinanceiroContaReceber.TelaFinanceiroContaReceber',
		'Financeiro.FinanceiroContaReceber.TelaFinanceiroContaReceberEdit',
		'Financeiro.FinanceiroContaReceber.GridContaReceber'
    ],
    refs: [
        {
            ref: 'telaFinanceiroContaReceber',
            selector: 'telaFinanceiroContaReceber'
        },
        {
            ref: 'telaFinanceiroContaReceberEdit',
            selector: 'telaFinanceiroContaReceberEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaFinanceiroContaReceber': {
				afterrender: this.telaFinanceiroContaReceber_afterrender,
				beforedestroy: this.telaFinanceiroContaReceber_beforedestroy
            },
			'telaFinanceiroContaReceber #btnNovoContaReceber': {
				click: this.telaFinanceiroContaReceber_btnNovoContaReceber_click
			},
			'telaFinanceiroContaReceber #btnEditarContaReceber': {
				click: this.telaFinanceiroContaReceber_btnEditarContaReceber_click
			},	
			'telaFinanceiroContaReceber #gridContaReceber': {
				itemdblclick: this.telaFinanceiroContaReceber_gridContaReceber_itemdblclick
			},
			'telaFinanceiroContaReceber #btnExcluirContaReceber': {
				click: this.telaFinanceiroContaReceber_btnExcluirContaReceber_click
			},
			'telaFinanceiroContaReceber #btnAtualizarLista': {
				click: this.telaFinanceiroContaReceber_btnAtualizarLista_click
			},
			'telaFinanceiroContaReceber #btnFiltroPesquisa': {
				click: this.telaFinanceiroContaReceber_btnFiltroPesquisa_click
			},	
			'telaFinanceiroContaReceber #btnPesquisarPesquisa': {
				click: this.telaFinanceiroContaReceber_btnPesquisarPesquisa_click
			},
			'telaFinanceiroContaReceber #btnLimparPesquisa': {
				click: this.telaFinanceiroContaReceber_btnLimparPesquisa_click
			},
			
			// ações de edição
			'telaFinanceiroContaReceberEdit #btnSalvar': {
				click: this.telaFinanceiroContaReceberEdit_btnSalvar_click
			},
			'telaFinanceiroContaReceberEdit #btnSair': {
				click: this.telaFinanceiroContaReceberEdit_btnSair_click
			},
			'telaFinanceiroContaReceberEdit #btnLiquidar': {
				click: this.telaFinanceiroContaReceberEdit_btnLiquidar_click
			},
			'telaFinanceiroContaReceberEdit #btnCancelar': {
				click: this.telaFinanceiroContaReceberEdit_btnCancelar_click
			},
			'telaFinanceiroContaReceberEdit #btnDevolver': {
				click: this.telaFinanceiroContaReceberEdit_btnDevolver_click
			},
			'telaFinanceiroContaReceberEdit #btnNegativar': {
				click: this.telaFinanceiroContaReceberEdit_btnNegativar_click
			},
			'telaFinanceiroContaReceberEdit #btnAbrir': {
				click: this.telaFinanceiroContaReceberEdit_btnAbrir_click
			},
			'telaFinanceiroContaReceberEdit #btnImprimirBoleto': {
				click: this.telaFinanceiroContaReceberEdit_btnImprimirBoleto_click
			},
			
			// Ajustes nos campos associados a combos
			'telaFinanceiroContaReceberEdit #cboCdPessoaPj': {
				change: this.telaFinanceiroContaReceberEdit_cboCdPessoaPj_change
			},
			'telaFinanceiroContaReceberEdit #cboCdPessoa': {
				change: this.telaFinanceiroContaReceberEdit_cboCdPessoa_change
			},
			'telaFinanceiroContaReceberEdit #cboCdPlanoConta': {
				change: this.telaFinanceiroContaReceberEdit_cboCdPlanoConta_change
			},
			
			// Calcular o valor liquido 
			'telaFinanceiroContaReceberEdit #edtVlConta': {
				change: this.telaFinanceiroContaReceberEdit_edtVlConta_change
			},
			'telaFinanceiroContaReceberEdit #edtVlMoraJuro': {
				change: this.telaFinanceiroContaReceberEdit_edtVlMoraJuro_change
			},
			'telaFinanceiroContaReceberEdit #edtVlDespesa': {
				change: this.telaFinanceiroContaReceberEdit_edtVlDespesa_change
			},
			'telaFinanceiroContaReceberEdit #edtVlDesconto': {
				change: this.telaFinanceiroContaReceberEdit_edtVlDesconto_change
			},
			'telaFinanceiroContaReceberEdit #edtVlDespesaCobranca': {
				change: this.telaFinanceiroContaReceberEdit_edtVlDespesaCobranca_change
			},
			'telaFinanceiroContaReceberEdit #edtVlAbatimento': {
				change: this.telaFinanceiroContaReceberEdit_edtVlAbatimento_change
			},
			'telaFinanceiroContaReceberEdit #edtVlIof': {
				change: this.telaFinanceiroContaReceberEdit_edtVlIof_change
			},
			'telaFinanceiroContaReceberEdit #edtVlOutrosCreditos': {
				change: this.telaFinanceiroContaReceberEdit_edtVlOutrosCreditos_change
			}
        })   
    },

    telaFinanceiroContaReceberEdit_btnImprimirBoleto_click: function(button) {
    	var win = button.up('window');
    	
    	/* 1ª forma 
    	this.getController('Global.MenuPrincipalController').abrirRelatorio('BoletoBancario',
		'Boleto de Cobrança Bancária','../lib/boletophp-master/boleto_bradesco.php');
    	*/
    	
    	/* 2ª forma
		var myForm = new Ext.form.Panel({
			width: 800,
			height: 600,
			title: 'Boleto Bancário',
			floating: true,
			closable : true,
			items: {
				xtype: 'component',
				autoEl: {
					tag: 'iframe',
					style: 'height: 100%; width: 100%; border: none',
					src: ('../lib/boletophp-master/boleto_bradesco.php'+
						'?valor_cobrado='+this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlLiquidacao').getValue()
					)
				}
			},
			buttons: [ 
		  		{ 
		  		  itemId: 'btnImpBoleto',
		  		  width: 75,
		  		  height: 20,
		  		  text: 'Imprimir',
		  		  iconCls: 'print_16',
		  		  handler:function() {
		  			//myForm.print();
		  			//printPage.fit(true);
		  		  }
		  		}		
		  	]			
		});
		myForm.show();
    	*/
    	
    	var myWindow = window.open('../lib/boletophp-master/boleto_bradesco.php'+
				'?valor_cobrado='+this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlLiquidacao').getValue(),
				'Boleto bancário','width=700,height=600,scrolling=auto,top=0,left=0'); 
    	//myWindow.print();
    	
		win.close();
	},
    
    telaFinanceiroContaReceberEdit_btnLiquidar_click: function(button) {
    	this.baixaAcao('L');
	},
    
    telaFinanceiroContaReceberEdit_btnCancelar_click: function(button) {
    	this.baixaAcao('C');
	},
	
    telaFinanceiroContaReceberEdit_btnDevolver_click: function(button) {
    	this.baixaAcao('D');
    },
	
    telaFinanceiroContaReceberEdit_btnNegativar_click: function(button) {
    	this.baixaAcao('N');
	},
	
    telaFinanceiroContaReceberEdit_btnAbrir_click: function(button) {
    	this.baixaAcao('A');
    },
	
	baixaAcao: function(novaSituacao) {
		var controller = this;
		var cdContaReceber = this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdContaReceber').getValue(); 
		var dsContaReceber = this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsContaReceber').getValue(); 
		if (cdContaReceber != null) {
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
				 msg: "Deseja realmente "+tipoBaixa+" esta conta: "+dsContaReceber+"?",
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaFinanceiroContaReceberEdit().setLoading('Aguarde...');

						Ext.Ajax.request({
							url: '../erp/controller/Financeiro/FinanceiroContaReceberController.php?op=baixar',
							params: {
								cdContaReceber: cdContaReceber,
								novaSituacao: novaSituacao
							},
							success: function(response) {
								controller.getTelaFinanceiroContaReceberEdit().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarContaReceber();
									controller.getTelaFinanceiroContaReceberEdit().setLoading(false);
									controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdSituacao').setValue(novaSituacao);
									controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsSituacao').setValue(respBaixa);
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
								controller.getTelaFinanceiroContaReceberEdit().setLoading(false);
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
    
    telaFinanceiroContaReceberEdit_edtVlConta_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaFinanceiroContaReceberEdit_edtVlMoraJuro_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaFinanceiroContaReceberEdit_edtVlDespesa_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaFinanceiroContaReceberEdit_edtVlDesconto_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaFinanceiroContaReceberEdit_edtVlDespesaCobranca_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaFinanceiroContaReceberEdit_edtVlAbatimento_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaFinanceiroContaReceberEdit_edtVlIof_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaFinanceiroContaReceberEdit_edtVlOutrosCreditos_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	totalLiquidoConta: function() {
    	var total = parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlConta').getValue()) +
			parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlMoraJuro').getValue()) +
			parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlDespesa').getValue()) -
			parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlDesconto').getValue()) +
			parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlDespesaCobranca').getValue()) -
			parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlAbatimento').getValue()) +
			parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlIof').getValue()) +
			parseFloat(this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlOutrosCreditos').getValue());
    	this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtVlLiquidacao').setValue(total);
	},
	
    telaFinanceiroContaReceberEdit_cboCdPessoaPj_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdPessoaPj').setValue(newValue);
	},
    
    telaFinanceiroContaReceberEdit_cboCdPessoa_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdPessoa').setValue(newValue);
	},

	telaFinanceiroContaReceberEdit_cboCdPlanoConta_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdPlanoConta').setValue(newValue);
	},
	
	prepararEdicaoContaReceber: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Financeiro.FinanceiroContaReceber.TelaFinanceiroContaReceberEdit').show();

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
				controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('cboCdPessoaPj').setValue(records[0].get('CD_PESSOA_PJ'));
				controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('cboCdPessoaPj').setRawValue(records[0].get('NM_RAZAO_SOCIAL'));
				controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdPessoaPj').setValue(records[0].get('CD_PESSOA_PJ'));
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
					controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('cboCdPessoa').setValue(records[0].get('CD_PESSOA'));
					controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('cboCdPessoa').setRawValue(records[0].get('NM_PESSOA'));
					controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdPessoa').setValue(records[0].get('CD_PESSOA'));
				}
				storePessoa.un('load',handleLoad);
			});	
			
			// Combo de plano de contas
			if (record.get('CD_PLANO_CONTA') == null) {
				record.set('CD_PLANO_CONTA',-1);
			}
			var storePlanoContaSinteticoCredito = controller.getGenericoPlanoContaSinteticoCreditoStoreStore();
			storePlanoContaSinteticoCredito.load({params:{cdPlanoConta: record.get('CD_PLANO_CONTA')}});
			storePlanoContaSinteticoCredito.on('load',  function handleLoad(st,records) {
				if (storePlanoContaSinteticoCredito.getCount() > 0) {
					controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('cboCdPlanoConta').setValue(records[0].get('CD_PLANO_CONTA'));
					controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('cboCdPlanoConta').setRawValue(records[0].get('DS_PLANO_CONTA'));
					controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdPlanoConta').setValue(records[0].get('CD_PLANO_CONTA'));
				}
				storePlanoContaSinteticoCredito.un('load',handleLoad);
			});
			
		});	
		
		controller.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdConta').focus(false,300);	
	},	
	
    telaFinanceiroContaReceberEdit_btnSair_click: function(button) {
		var win = button.up('window');
		win.close();
	},
    
	pesquisarContaReceber: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getFinanceiroFinanceiroContaReceberContaReceberStoreStore();
		
		var prx = store.getProxy();			
		
		//Tratamento nas datas
		var dtInicio = '';
		var dtFim = '';
		if (controller.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue() != '') {
			dtInicio = controller.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue();
		}
		if (controller.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue() != '') {
			dtFim = controller.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue();
		}
		
		// verificação qual a data para filtro
		var tipoDataPesquisa = "";
		tipoDataPesquisa = controller.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsDataPesquisa').getComponent('rdgDataPesquisa').getChecked()[0].inputValue;
		
		Ext.apply(prx, { url: '../erp/controller/Financeiro/FinanceiroContaReceberController.php'
			+ '?op=getListaContaReceber&dsContaReceber='+controller.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('edtDsContaReceberPesquisa').getValue() 
			+ '&dtInicio='+Ext.Date.format(dtInicio, 'Y-m-d')
			+ '&dtFim='+Ext.Date.format(dtFim, 'Y-m-d')
			+ '&tipoDataPesquisa='+tipoDataPesquisa
		});
		 
		store.setProxy(prx);
		controller.getTelaFinanceiroContaReceber().setLoading('Aguarde...');
		
		controller.getTelaFinanceiroContaReceber().getComponent('gridContaReceber').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaFinanceiroContaReceber().getComponent('gridContaReceber') != undefined) {
					controller.getTelaFinanceiroContaReceber().getComponent('gridContaReceber').getSelectionModel().select(0); 
				}
			} else {
				controller.getFinanceiroFinanceiroContaReceberContaReceberStoreStore().removeAll();
			}
			controller.getTelaFinanceiroContaReceber().setLoading(false);
		});
			
	},	
	
	telaFinanceiroContaReceber_afterrender: function(panel) {
		this.pesquisarContaReceber();
	},
	
	telaFinanceiroContaReceber_beforedestroy: function(panel) {
		this.getFinanceiroFinanceiroContaReceberContaReceberStoreStore().removeAll();
	},

	telaFinanceiroContaReceber_btnNovoContaReceber_click: function(button) {
		Ext.create('erp.view.Financeiro.FinanceiroContaReceber.TelaFinanceiroContaReceberEdit').show();
		
		this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdSituacao').setValue('A');
		this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsSituacao').setValue('Aberta');
		
		this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtCdConta').focus(false,300); 
	},
	
	telaFinanceiroContaReceber_btnEditarContaReceber_click: function(button) {
		var record = this.getTelaFinanceiroContaReceber().getComponent('gridContaReceber').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoContaReceber(record[0]);
		}
	},

	telaFinanceiroContaReceber_gridContaReceber_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoContaReceber(record);
		}
	},

	telaFinanceiroContaReceber_btnExcluirContaReceber_click: function(button) {
		var controller = this;
		var record = controller.getTelaFinanceiroContaReceber().getComponent('gridContaReceber').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaFinanceiroContaReceber().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Financeiro/FinanceiroContaReceberController.php?op=excluir',
							params: {
								cdContaReceber: record[0].get('CD_CONTA_RECEBER')	
							},
							success: function(response) {
								controller.getTelaFinanceiroContaReceber().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarContaReceber();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaFinanceiroContaReceber().setLoading(false);
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
	
	telaFinanceiroContaReceber_btnAtualizarLista_click: function(button) {
		this.pesquisarContaReceber();	
	},	
	
	telaFinanceiroContaReceber_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').isHidden()) {
			this.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').setVisible(true);
		} else {
			this.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').setVisible(false);
		}
	},

	telaFinanceiroContaReceberEdit_btnSalvar_click: function(button) {
	
		var controller = this;
		var st = this.getFinanceiroFinanceiroContaReceberContaReceberStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Financeiro.FinanceiroContaReceber.ContaReceberModel');
		var reg = Ext.create(model, form.getValues(false,false,false,false));
		
		if (form.isValid()) {
		
			/* Ajustando o código da situação
				WHEN 'A' THEN 'Aberta'
				WHEN 'D' THEN 'Devolvida'
				WHEN 'L' THEN 'Liquidada'
				WHEN 'C' THEN 'Cancelada'
				WHEN 'N' THEN 'Negativada'
			*/
			if ( this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsSituacao').getValue() == 'Aberta' ) {
				reg.set('CD_SITUACAO','A');
			} else if ( this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsSituacao').getValue() == 'Devolvida' ) {
				reg.set('CD_SITUACAO','D');
			} else if ( this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsSituacao').getValue() == 'Liquidada' ) {
				reg.set('CD_SITUACAO','L');
			} else if ( this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsSituacao').getValue() == 'Cancelada' ) {
				reg.set('CD_SITUACAO','C');
			} else if ( this.getTelaFinanceiroContaReceberEdit().down('form').getComponent('pnlItensConta').getComponent('tabConta').getComponent('edtDsSituacao').getValue() == 'Negativada' ) {
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
				url: '../erp/controller/Financeiro/FinanceiroContaReceberController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						//win.close();
						controller.pesquisarContaReceber();
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

	telaFinanceiroContaReceber_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarContaReceber();
	},
	
	telaFinanceiroContaReceber_btnLimparPesquisa_click: function(button) {
		this.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('edtDsContaReceberPesquisa').setValue('');
		this.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').setValue(null);
		this.getTelaFinanceiroContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').setValue(null);
		this.pesquisarContaReceber();
	}
	
});