Ext.define('erp.controller.Financeiro.BaixaContaPagarController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Financeiro.BaixaContaPagar.ContaPagarStore'
    ],
	views: [
		'Financeiro.BaixaContaPagar.TelaBaixaContaPagar',
		'Financeiro.BaixaContaPagar.TelaBaixaContaPagarEdit',
		'Financeiro.BaixaContaPagar.GridContaPagar'
    ],
    refs: [
        {
            ref: 'telaBaixaContaPagar',
            selector: 'telaBaixaContaPagar'
        },
        {
            ref: 'telaBaixaContaPagarEdit',
            selector: 'telaBaixaContaPagarEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaBaixaContaPagar': {
				afterrender: this.telaBaixaContaPagar_afterrender,
				beforedestroy: this.telaBaixaContaPagar_beforedestroy
            },
			'telaBaixaContaPagar #gridContaPagar': {
				itemdblclick: this.telaBaixaContaPagar_gridContaPagar_itemdblclick
			},
			'telaBaixaContaPagar #btnAtualizarLista': {
				click: this.telaBaixaContaPagar_btnAtualizarLista_click
			},
			'telaBaixaContaPagar #btnFiltroPesquisa': {
				click: this.telaBaixaContaPagar_btnFiltroPesquisa_click
			},	
			'telaBaixaContaPagar #btnPesquisarPesquisa': {
				click: this.telaBaixaContaPagar_btnPesquisarPesquisa_click
			},
			'telaBaixaContaPagar #btnLimparPesquisa': {
				click: this.telaBaixaContaPagar_btnLimparPesquisa_click
			},
			'telaBaixaContaPagarEdit #btnSalvar': {
				click: this.telaBaixaContaPagarEdit_btnSalvar_click
			},
			
			// Calcular o valor liquido 
			'telaBaixaContaPagarEdit #edtVlConta': {
				change: this.telaBaixaContaPagarEdit_edtVlConta_change
			},
			'telaBaixaContaPagarEdit #edtVlMoraJuro': {
				change: this.telaBaixaContaPagarEdit_edtVlMoraJuro_change
			},
			'telaBaixaContaPagarEdit #edtVlDespesa': {
				change: this.telaBaixaContaPagarEdit_edtVlDespesa_change
			},
			'telaBaixaContaPagarEdit #edtVlDesconto': {
				change: this.telaBaixaContaPagarEdit_edtVlDesconto_change
			}
			
        })   
    },
	
    telaBaixaContaPagar_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarContaPagar();
	},
    
	telaBaixaContaPagar_btnLimparPesquisa_click: function(button) {
		this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('edtDsContaPagarPesquisa').setValue('');
		this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsSituacaoPesquisa').getComponent('rdgSituacaoPesquisa').setValue({radioSituacaoPesquisa: ''});
		this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').setValue(null);
		this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').setValue(null);
		
		this.pesquisarContaPagar();
	},
	
    telaBaixaContaPagarEdit_edtVlConta_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaBaixaContaPagarEdit_edtVlMoraJuro_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaBaixaContaPagarEdit_edtVlDespesa_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},

	telaBaixaContaPagarEdit_edtVlDesconto_change: function(edit, newValue, oldValue, eOpts) {
    	this.totalLiquidoConta();
	},
	
	totalLiquidoConta: function() {
    	var total = parseFloat(this.getTelaBaixaContaPagarEdit().down('form').getComponent('edtVlConta').getValue()) +
			parseFloat(this.getTelaBaixaContaPagarEdit().down('form').getComponent('edtVlMoraJuro').getValue()) +
			parseFloat(this.getTelaBaixaContaPagarEdit().down('form').getComponent('edtVlDespesa').getValue()) -
			parseFloat(this.getTelaBaixaContaPagarEdit().down('form').getComponent('edtVlDesconto').getValue());
    	this.getTelaBaixaContaPagarEdit().down('form').getComponent('edtVlLiquidacao').setValue(total);
	},
    
	telaBaixaContaPagarEdit_btnSalvar_click: function(button) {
		var controller = this;
		var st = this.getFinanceiroBaixaContaPagarContaPagarStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Financeiro.BaixaContaPagar.ContaPagarModel');
		var reg = Ext.create(model, form.getValues(false,false,false,false));
		
		if (form.isValid()) {
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			
			var novaSituacao = controller.getTelaBaixaContaPagarEdit().down('form').getComponent('fdsSituacaoConta').getComponent('rdgSituacaoConta').getChecked()[0].inputValue;
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
				url: '../erp/controller/Financeiro/BaixaContaPagarController.php?op=baixar',
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarContaPagar();
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
	
	pesquisarContaPagar: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getFinanceiroBaixaContaPagarContaPagarStoreStore();
		
		var prx = store.getProxy();			
		
		//Tratamento nas datas
		var dtInicio = '';
		var dtFim = '';
		if (controller.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue() != '') {
			dtInicio = controller.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue();
		}
		if (controller.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue() != '') {
			dtFim = controller.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue();
		}
		
		// verificação qual a data para filtro
		var tipoDataPesquisa = "";
		tipoDataPesquisa = controller.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsDataPesquisa').getComponent('rdgDataPesquisa').getChecked()[0].inputValue;
		
		// Situações
		var tipoSituacaoPesquisa = "";
		tipoSituacaoPesquisa = controller.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsSituacaoPesquisa').getComponent('rdgSituacaoPesquisa').getChecked()[0].inputValue;

		Ext.apply(prx, { url: '../erp/controller/Financeiro/BaixaContaPagarController.php'
			+ '?op=getListaContaPagar&dsContaPagar='+controller.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('edtDsContaPagarPesquisa').getValue() 
			+ '&dtInicio='+Ext.Date.format(dtInicio, 'Y-m-d')
			+ '&dtFim='+Ext.Date.format(dtFim, 'Y-m-d')
			+ '&tipoDataPesquisa='+tipoDataPesquisa
			+ '&tipoSituacaoPesquisa='+tipoSituacaoPesquisa
		});
		 
		store.setProxy(prx);
		controller.getTelaBaixaContaPagar().setLoading('Aguarde...');
		
		controller.getTelaBaixaContaPagar().getComponent('gridContaPagar').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaBaixaContaPagar().getComponent('gridContaPagar') != undefined) {
					controller.getTelaBaixaContaPagar().getComponent('gridContaPagar').getSelectionModel().select(0); 
				}
			} else {
				controller.getFinanceiroBaixaContaPagarContaPagarStoreStore().removeAll();
			}
			controller.getTelaBaixaContaPagar().setLoading(false);
		});
			
	},	
	
	telaBaixaContaPagar_afterrender: function(panel) {
		this.pesquisarContaPagar();
	},
	
	telaBaixaContaPagar_beforedestroy: function(panel) {
		this.getFinanceiroBaixaContaPagarContaPagarStoreStore().removeAll();
	},

	telaBaixaContaPagar_gridContaPagar_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoContaPagar(record);
		}
	},

	prepararEdicaoContaPagar: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Financeiro.BaixaContaPagar.TelaBaixaContaPagarEdit').show();
		//Carrega os dados no form
		win.down('form').loadRecord(record);
		//if ( record.get('CD_SITUACAO') == 'A' ) {
		controller.getTelaBaixaContaPagarEdit().down('form').getComponent('edtDtLiquidacao').setValue(new Date());
		//}
		controller.getTelaBaixaContaPagarEdit().down('form').getComponent('edtDsContaPagar').focus(false,300);	
	},	
	
	telaBaixaContaPagar_btnAtualizarLista_click: function(button) {
		this.pesquisarContaPagar();	
	},	
	
	telaBaixaContaPagar_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').isHidden()) {
			this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').setVisible(true);
		} else {
			this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').setVisible(false);
		}
	},

	FinanceiroContaPagar_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarContaPagar();
	},
	
	FinanceiroContaPagar_btnLimparPesquisa_click: function(button) {
		this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('edtDsContaPagarPesquisa').setValue('');
		this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').setValue(null);
		this.getTelaBaixaContaPagar().getComponent('panPesquisaContaPagar').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').setValue(null);
		this.pesquisarContaPagar();
	}
	
});