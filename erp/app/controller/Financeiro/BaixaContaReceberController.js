Ext.define('erp.controller.Financeiro.BaixaContaReceberController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Financeiro.BaixaContaReceber.ContaReceberStore'
    ],
	views: [
		'Financeiro.BaixaContaReceber.TelaBaixaContaReceber',
		'Financeiro.BaixaContaReceber.TelaBaixaContaReceberEdit',
		'Financeiro.BaixaContaReceber.GridContaReceber'
    ],
    refs: [
        {
            ref: 'telaBaixaContaReceber',
            selector: 'telaBaixaContaReceber'
        },
        {
            ref: 'telaBaixaContaReceberEdit',
            selector: 'telaBaixaContaReceberEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaBaixaContaReceber': {
				afterrender: this.telaBaixaContaReceber_afterrender,
				beforedestroy: this.telaBaixaContaReceber_beforedestroy
            },
			'telaBaixaContaReceber #gridContaReceber': {
				itemdblclick: this.telaBaixaContaReceber_gridContaReceber_itemdblclick
			},
			'telaBaixaContaReceber #btnAtualizarLista': {
				click: this.telaBaixaContaReceber_btnAtualizarLista_click
			},
			'telaBaixaContaReceber #btnFiltroPesquisa': {
				click: this.telaBaixaContaReceber_btnFiltroPesquisa_click
			},	
			'telaBaixaContaReceber #btnPesquisarPesquisa': {
				click: this.telaBaixaContaReceber_btnPesquisarPesquisa_click
			},
			'telaBaixaContaReceber #btnLimparPesquisa': {
				click: this.telaBaixaContaReceber_btnLimparPesquisa_click
			},
			'telaBaixaContaReceberEdit #btnSalvar': {
				click: this.telaBaixaContaReceberEdit_btnSalvar_click
			},
			
			// Calcular o valor liquido 
			'telaBaixaContaReceberEdit #edtVlConta': {
				change: this.telaBaixaContaReceberEdit_edtVlConta_change
			},
			'telaBaixaContaReceberEdit #edtVlMoraJuro': {
				change: this.telaBaixaContaReceberEdit_edtVlMoraJuro_change
			},
			'telaBaixaContaReceberEdit #edtVlDespesa': {
				change: this.telaBaixaContaReceberEdit_edtVlDespesa_change
			},
			'telaBaixaContaReceberEdit #edtVlDesconto': {
				change: this.telaBaixaContaReceberEdit_edtVlDesconto_change
			},
			'telaBaixaContaReceberEdit #edtVlDespesaCobranca': {
				change: this.telaBaixaContaReceberEdit_edtVlDespesaCobranca_change
			},
			'telaBaixaContaReceberEdit #edtVlAbatimento': {
				change: this.telaBaixaContaReceberEdit_edtVlAbatimento_change
			},
			'telaBaixaContaReceberEdit #edtVlIof': {
				change: this.telaBaixaContaReceberEdit_edtVlIof_change
			},
			'telaBaixaContaReceberEdit #edtVlOutrosCreditos': {
				change: this.telaBaixaContaReceberEdit_edtVlOutrosCreditos_change
			}
        })   
    },
	
    telaBaixaContaReceber_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarContaReceber();
	},
    
	telaBaixaContaReceber_btnLimparPesquisa_click: function(button) {
		this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('edtDsContaReceberPesquisa').setValue('');
		this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsSituacaoPesquisa').getComponent('rdgSituacaoPesquisa').setValue({radioSituacaoPesquisa: ''});
		this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').setValue(null);
		this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').setValue(null);
		
		this.pesquisarContaReceber();
	},
	
    telaBaixaContaReceberEdit_edtVlConta_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaBaixaContaReceberEdit_edtVlMoraJuro_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaBaixaContaReceberEdit_edtVlDespesa_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaBaixaContaReceberEdit_edtVlDesconto_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaBaixaContaReceberEdit_edtVlDespesaCobranca_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaBaixaContaReceberEdit_edtVlAbatimento_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaBaixaContaReceberEdit_edtVlIof_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	telaBaixaContaReceberEdit_edtVlOutrosCreditos_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	totalLiquidoConta: function() {
    	var total = parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlConta').getValue()) +
			parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlMoraJuro').getValue()) +
			parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlDespesa').getValue()) -
			parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlDesconto').getValue()) +
			parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlDespesaCobranca').getValue()) -
			parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlAbatimento').getValue()) +
			parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlIof').getValue()) +
			parseFloat(this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlOutrosCreditos').getValue());
    	this.getTelaBaixaContaReceberEdit().down('form').getComponent('edtVlLiquidacao').setValue(total);
	},
    
	telaBaixaContaReceberEdit_btnSalvar_click: function(button) {
		var controller = this;
		var st = this.getFinanceiroBaixaContaReceberContaReceberStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Financeiro.BaixaContaReceber.ContaReceberModel');
		var reg = Ext.create(model, form.getValues(false,false,false,false));
		
		if (form.isValid()) {
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			
			var novaSituacao = controller.getTelaBaixaContaReceberEdit().down('form').getComponent('fdsSituacaoConta').getComponent('rdgSituacaoConta').getChecked()[0].inputValue;
			var respBaixa = "";
			if ( novaSituacao == 'L') {
				respBaixa = 'liquidada';
			} else if ( novaSituacao == 'C') {
				respBaixa = 'cancelada';
			} else if ( novaSituacao == 'D') {
				respBaixa = 'devolvida';
			} else if ( novaSituacao == 'N') {
				respBaixa = 'negativada';
			} else if ( novaSituacao == 'A') {
				respBaixa = 'aberta';
			}
			reg.set('CD_SITUACAO',novaSituacao);
			
			Ext.Ajax.request({
				url: '../erp/controller/Financeiro/BaixaContaReceberController.php?op=baixar',
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarContaReceber();
						Ext.msgbox.msg('Informação', 'Conta '+respBaixa+' com êxito...', 'I', 5000);
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
	
	pesquisarContaReceber: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getFinanceiroBaixaContaReceberContaReceberStoreStore();
		
		var prx = store.getProxy();			
		
		//Tratamento nas datas
		var dtInicio = '';
		var dtFim = '';
		if (controller.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue() != '') {
			dtInicio = controller.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue();
		}
		if (controller.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue() != '') {
			dtFim = controller.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue();
		}
		
		// verificação qual a data para filtro
		var tipoDataPesquisa = "";
		tipoDataPesquisa = controller.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsDataPesquisa').getComponent('rdgDataPesquisa').getChecked()[0].inputValue;
		
		// Situações
		var tipoSituacaoPesquisa = "";
		tipoSituacaoPesquisa = controller.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsSituacaoPesquisa').getComponent('rdgSituacaoPesquisa').getChecked()[0].inputValue;

		Ext.apply(prx, { url: '../erp/controller/Financeiro/BaixaContaReceberController.php'
			+ '?op=getListaContaReceber&dsContaReceber='+controller.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('edtDsContaReceberPesquisa').getValue() 
			+ '&dtInicio='+Ext.Date.format(dtInicio, 'Y-m-d')
			+ '&dtFim='+Ext.Date.format(dtFim, 'Y-m-d')
			+ '&tipoDataPesquisa='+tipoDataPesquisa
			+ '&tipoSituacaoPesquisa='+tipoSituacaoPesquisa
		});
		 
		store.setProxy(prx);
		controller.getTelaBaixaContaReceber().setLoading('Aguarde...');
		
		controller.getTelaBaixaContaReceber().getComponent('gridContaReceber').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaBaixaContaReceber().getComponent('gridContaReceber') != undefined) {
					controller.getTelaBaixaContaReceber().getComponent('gridContaReceber').getSelectionModel().select(0); 
				}
			} else {
				controller.getFinanceiroBaixaContaReceberContaReceberStoreStore().removeAll();
			}
			controller.getTelaBaixaContaReceber().setLoading(false);
		});
			
	},	
	
	telaBaixaContaReceber_afterrender: function(panel) {
		this.pesquisarContaReceber();
	},
	
	telaBaixaContaReceber_beforedestroy: function(panel) {
		this.getFinanceiroBaixaContaReceberContaReceberStoreStore().removeAll();
	},

	telaBaixaContaReceber_gridContaReceber_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoContaReceber(record);
		}
	},

	prepararEdicaoContaReceber: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Financeiro.BaixaContaReceber.TelaBaixaContaReceberEdit').show();
		//Carrega os dados no form
		win.down('form').loadRecord(record);
		//if ( record.get('CD_SITUACAO') == 'A' ) {
		controller.getTelaBaixaContaReceberEdit().down('form').getComponent('edtDtLiquidacao').setValue(new Date());
		//}
		controller.getTelaBaixaContaReceberEdit().down('form').getComponent('edtDsContaReceber').focus(false,300);	
	},	
	
	telaBaixaContaReceber_btnAtualizarLista_click: function(button) {
		this.pesquisarContaReceber();	
	},	
	
	telaBaixaContaReceber_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').isHidden()) {
			this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').setVisible(true);
		} else {
			this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').setVisible(false);
		}
	},

	FinanceiroContaReceber_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarContaReceber();
	},
	
	FinanceiroContaReceber_btnLimparPesquisa_click: function(button) {
		this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('edtDsContaReceberPesquisa').setValue('');
		this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').setValue(null);
		this.getTelaBaixaContaReceber().getComponent('panPesquisaContaReceber').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').setValue(null);
		this.pesquisarContaReceber();
	}
	
});