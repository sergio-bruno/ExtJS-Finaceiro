Ext.define('erp.controller.Movimento.MovimentoFichaServicoController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Generico.PessoaPjClienteStore',
		'Generico.TipoServicoStore',
		'Generico.AreaAtuacaoStore',
		'Generico.StatusFichaStore',
		'Movimento.MovimentoFichaServico.FichaServicoStore',
		'Movimento.MovimentoFichaServico.VisitaFichaServicoStore',
		'Movimento.MovimentoFichaServico.VisitaFichaServicoDbStore',
		'Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoStore',
		'Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoDbStore',
		'Movimento.MovimentoFichaServico.AcaoComercialFichaServicoStore',
		'Movimento.MovimentoFichaServico.AcaoComercialFichaServicoDbStore',
		'Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoStore',
		'Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoDbStore',
		'Movimento.MovimentoFichaServico.LicitacaoRealizadaFichaServicoStore',
		'Movimento.MovimentoFichaServico.LicitacaoRealizadaFichaServicoDbStore',
		'Movimento.MovimentoFichaServico.InvestimentoFichaServicoStore',
		'Movimento.MovimentoFichaServico.InvestimentoFichaServicoDbStore'
    ],
	views: [
		'Movimento.MovimentoFichaServico.TelaMovimentoFichaServico',
		'Movimento.MovimentoFichaServico.TelaMovimentoFichaServicoEdit',
		'Movimento.MovimentoFichaServico.GridFichaServico',
		'Movimento.MovimentoFichaServico.GridItVisitaFichaServico',
		'Movimento.MovimentoFichaServico.GridItContratoAnteriorFichaServico',
		'Movimento.MovimentoFichaServico.GridItLicitacaoRealizarFichaServico',
		'Movimento.MovimentoFichaServico.GridItLicitacaoRealizadaFichaServico',
		'Movimento.MovimentoFichaServico.GridItAcaoComercialFichaServico',
		'Movimento.MovimentoFichaServico.GridItInvestimentoFichaServico'
    ],
    refs: [
        {
            ref: 'telaMovimentoFichaServico',
            selector: 'telaMovimentoFichaServico'
        },
        {
            ref: 'telaMovimentoFichaServicoEdit',
            selector: 'telaMovimentoFichaServicoEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaMovimentoFichaServico': {
				afterrender: this.telaMovimentoFichaServico_afterrender,
				beforedestroy: this.telaMovimentoFichaServico_beforedestroy
            },
			'telaMovimentoFichaServico #btnNovoFichaServico': {
				click: this.telaMovimentoFichaServico_btnNovoFichaServico_click
			},
			'telaMovimentoFichaServico #btnEditarFichaServico': {
				click: this.telaMovimentoFichaServico_btnEditarFichaServico_click
			},	
			'telaMovimentoFichaServico #gridFichaServico': {
				itemdblclick: this.telaMovimentoFichaServico_gridFichaServico_itemdblclick
			},
			'telaMovimentoFichaServico #btnExcluirFichaServico': {
				click: this.telaMovimentoFichaServico_btnExcluirFichaServico_click
			},
			'telaMovimentoFichaServico #btnAtualizarLista': {
				click: this.telaMovimentoFichaServico_btnAtualizarLista_click
			},
			'telaMovimentoFichaServico #btnFiltroPesquisa': {
				click: this.telaMovimentoFichaServico_btnFiltroPesquisa_click
			},	
			'telaMovimentoFichaServicoEdit #btnSalvar': {
				click: this.telaMovimentoFichaServicoEdit_btnSalvar_click
			},
			'telaMovimentoFichaServico #btnPesquisarPesquisa': {
				click: this.MovimentoFichaServico_btnPesquisarPesquisa_click
			},
			'telaMovimentoFichaServico #btnLimparPesquisa': {
				click: this.MovimentoFichaServico_btnLimparPesquisa_click
			},
			// tela de edição
            'telaMovimentoFichaServicoEdit': {
				beforedestroy: this.telaMovimentoFichaServicoEdit_beforedestroy
            },
			'telaMovimentoFichaServicoEdit #cboCdPessoaPj': {
				change: this.telaMovimentoFichaServicoEdit_cboCdPessoaPj_change
			},
			'telaMovimentoFichaServicoEdit #cboCdTipoServico': {
				change: this.telaMovimentoFichaServicoEdit_cboCdTipoServico_change
			},
			'telaMovimentoFichaServicoEdit #cboCdAreaAtuacao': {
				change: this.telaMovimentoFichaServicoEdit_cboCdAreaAtuacao_change
			},
			'telaMovimentoFichaServicoEdit #cboCdStatusFicha': {
				change: this.telaMovimentoFichaServicoEdit_cboCdStatusFicha_change
			},
			// Movimento de contrato anterior
			'telaMovimentoFichaServicoEdit #btnNovoContratoAnteriorFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnNovoContratoAnteriorFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnSalvarContratoAnteriorFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnSalvarContratoAnteriorFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnExcluirContratoAnteriorFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnExcluirContratoAnteriorFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #gridItContratoAnteriorFichaServico': {
				itemdblclick: this.telaMovimentoFichaServicoEdit_gridItContratoAnteriorFichaServico_itemdblclick
			},
			// Movimento de licitação realizada
			'telaMovimentoFichaServicoEdit #btnNovaLicitacaoRealizadaFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnNovaLicitacaoRealizadaFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnSalvarLicitacaoRealizadaFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnSalvarLicitacaoRealizadaFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnExcluirLicitacaoRealizadaFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnExcluirLicitacaoRealizadaFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #gridItLicitacaoRealizadaFichaServico': {
				itemdblclick: this.telaMovimentoFichaServicoEdit_gridItLicitacaoRealizadaFichaServico_itemdblclick
			},
			// Movimento de visitas
			'telaMovimentoFichaServicoEdit #btnNovoItVisitaFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnNovoItVisitaFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnSalvarItVisitaFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnSalvarItVisitaFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnExcluirItVisitaFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnExcluirItVisitaFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #gridItVisitaFichaServico': {
				itemdblclick: this.telaMovimentoFichaServicoEdit_gridItVisitaFichaServico_itemdblclick
			},
			// Movimento de ações comerciais
			'telaMovimentoFichaServicoEdit #btnNovaAcaoComercialFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnNovaAcaoComercialFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnSalvarAcaoComercialFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnSalvarAcaoComercialFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnExcluirAcaoComercialFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnExcluirAcaoComercialFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #gridItAcaoComercialFichaServico': {
				itemdblclick: this.telaMovimentoFichaServicoEdit_gridItAcaoComercialFichaServico_itemdblclick
			},
			// Movimento de investimentos
			'telaMovimentoFichaServicoEdit #btnNovoInvestimentoFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnNovoInvestimentoFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnSalvarInvestimentoFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnSalvarInvestimentoFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnExcluirInvestimentoFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnExcluirInvestimentoFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #gridItInvestimentoFichaServico': {
				itemdblclick: this.telaMovimentoFichaServicoEdit_gridItInvestimentoFichaServico_itemdblclick
			},
			// Movimento de licitação a realizar
			'telaMovimentoFichaServicoEdit #btnNovaLicitacaoRealizarFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnNovaLicitacaoRealizarFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnSalvarLicitacaoRealizarFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnSalvarLicitacaoRealizarFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #btnExcluirLicitacaoRealizarFichaServico': {
				click: this.telaMovimentoFichaServicoEdit_btnExcluirLicitacaoRealizarFichaServico_click
			},
			'telaMovimentoFichaServicoEdit #gridItLicitacaoRealizarFichaServico': {
				itemdblclick: this.telaMovimentoFichaServicoEdit_gridItLicitacaoRealizarFichaServico_itemdblclick
			}			
        })   
    },
	
	/* Início da ação de licitação a realizar ---------------------------------------------------*/
	telaMovimentoFichaServicoEdit_btnNovaLicitacaoRealizarFichaServico_click: function(button) {
		this.limpaDadosLicitacaoRealizar();
	},
	
	limpaDadosLicitacaoRealizar: function() {
		var controller = this;
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdOsLicitacaoRealizar').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdLicitacaoRealizar').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtDsObservacoesLicitacaoRealizar').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('ckbSnRealizadaLicitacaoRealizar').setValue('N');
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('ckbSnParticipaLicitacaoRealizar').setValue('S');
	},
	
	telaMovimentoFichaServicoEdit_gridItLicitacaoRealizarFichaServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			var snParticipa = 'N';
			if ( record.get('SN_PARTICIPA') == 'Sim' ) {
				snParticipa = 'S';
			}
			var snRealizada = 'N';
			if ( record.get('SN_REALIZADA') == 'Sim' ) {
				snRealizada = 'S';
			}
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdOsLicitacaoRealizar').setValue(record.get('CD_OS_LICITACAO'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdLicitacaoRealizar').setValue(record.get('CD_LICITACAO'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtDsObservacoesLicitacaoRealizar').setValue(record.get('DS_OBSERVACOES'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('ckbSnParticipaLicitacaoRealizar').setValue(snParticipa);
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('ckbSnRealizadaLicitacaoRealizar').setValue(snRealizada);
		}
	},
	
	telaMovimentoFichaServicoEdit_btnExcluirLicitacaoRealizarFichaServico_click: function(button) {
		var store = this.getMovimentoMovimentoFichaServicoLicitacaoRealizarFichaServicoStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum licitação foi inserida na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('gridItLicitacaoRealizarFichaServico').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir esta licitação?",
					minWidth: 200,
					modal: true,
					buttons: Ext.Msg.YESNO,
					fn: function(btn) {
						if (btn == 'yes') {
							store.remove(record[0]);
						};
					},
					icon: Ext.Msg.QUESTION
				});				
			} else { 		
				Ext.msgbox.msg('Aviso', 'Selecione primeiro uma licitação na lista...', 'W', 8000);		
			}
		}
	},
	
	telaMovimentoFichaServicoEdit_btnSalvarLicitacaoRealizarFichaServico_click: function(button) {
		var controller = this;
		if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdLicitacaoRealizar').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o código da licitação...', 'W', 8000);			
		} else if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtDsObservacoesLicitacaoRealizar').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar as observações da licitação...', 'W', 8000);			
		} else {
			var CdOsLicitacaoRealizar = controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdOsLicitacaoRealizar').getValue();
			var store = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizarFichaServicoStoreStore();

			var participa = 'Não';
			if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('ckbSnParticipaLicitacaoRealizar').getValue() == true ) {
				participa = 'Sim';	
			}
			var realizada = 'Não';
			if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('ckbSnRealizadaLicitacaoRealizar').getValue() == true ) {
				realizada = 'Sim';	
			}
			
			// Para alterar um visita
			if ( CdOsLicitacaoRealizar != "" && CdOsLicitacaoRealizar != null ) {
				// percorer a lista e alterar a licitação selecionada
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_OS_LICITACAO') == CdOsLicitacaoRealizar ) {
							rec.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
							rec.set('CD_LICITACAO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdLicitacaoRealizar').getValue());
							rec.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtDsObservacoesLicitacaoRealizar').getValue());
							rec.set('SN_PARTICIPA',participa);
							rec.set('SN_REALIZADA',realizada);
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Movimento.MovimentoFichaServico.LicitacaoRealizarFichaServicoModel');
				record.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
				record.set('CD_OS_LICITACAO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdOsLicitacaoRealizar').getValue());
				record.set('CD_LICITACAO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtCdLicitacaoRealizar').getValue());
				record.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizar').getComponent('edtDsObservacoesLicitacaoRealizar').getValue());
				record.set('SN_PARTICIPA',participa);
				record.set('SN_REALIZADA',realizada);
				store.add(record);
			}
			controller.limpaDadosLicitacaoRealizar();
		}
	},
	/* Fim das ações de licitação realizada */
	
	
	/* Início da ação de contrato anterior ---------------------------------------------------*/
	telaMovimentoFichaServicoEdit_btnNovoContratoAnteriorFichaServico_click: function(button) {
		this.limpaDadosContratoAnterior();
	},
	
	limpaDadosContratoAnterior: function() {
		var controller = this;
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtCdOsContrato').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtDsObservacoesContrato').setValue(null);
	},

	telaMovimentoFichaServicoEdit_gridItContratoAnteriorFichaServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtCdOsContrato').setValue(record.get('CD_OS_CONTRATO'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtDsObservacoesContrato').setValue(record.get('DS_OBSERVACOES'));
		}
	},
	
	telaMovimentoFichaServicoEdit_btnExcluirContratoAnteriorFichaServico_click: function(button) {
		var store = this.getMovimentoMovimentoFichaServicoContratoAnteriorFichaServicoStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum contrato foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('gridItContratoAnteriorFichaServico').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir este contrato?",
					minWidth: 200,
					modal: true,
					buttons: Ext.Msg.YESNO,
					fn: function(btn) {
						if (btn == 'yes') {
							store.remove(record[0]);
						};
					},
					icon: Ext.Msg.QUESTION
				});				
			} else { 		
				Ext.msgbox.msg('Aviso', 'Selecione primeiro um contrato na lista...', 'W', 8000);		
			}
		}
	},

	telaMovimentoFichaServicoEdit_btnSalvarContratoAnteriorFichaServico_click: function(button) {
		var controller = this;

		if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtDsObservacoesContrato').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar a descrição do contrato...', 'W', 8000);	
		} else {
			var cdOsContrato = controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtCdOsContrato').getValue();
			var store = controller.getMovimentoMovimentoFichaServicoContratoAnteriorFichaServicoStoreStore();

			// Para alterar um contrato 
			if ( cdOsContrato != "" && cdOsContrato != null ) {
				// percorer a lista e alterar o contrato selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_OS_CONTRATO') == cdOsContrato ) {
							rec.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
							rec.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtDsObservacoesContrato').getValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Movimento.MovimentoFichaServico.ContratoAnteriorFichaServicoModel');
				record.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
				record.set('CD_OS_CONTRATO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtCdOsContrato').getValue());
				record.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabContartosAnteriores').getComponent('edtDsObservacoesContrato').getValue());
				store.add(record);
			}
			controller.limpaDadosContratoAnterior();
		}
	},
	/* Fim das ações de contrato anterior */
	

	/* Início da ação de licitação realizada ---------------------------------------------------*/
	telaMovimentoFichaServicoEdit_btnNovaLicitacaoRealizadaFichaServico_click: function(button) {
		this.limpaDadosLicitacaoRealizada();
	},
	
	limpaDadosLicitacaoRealizada: function() {
		var controller = this;
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdOsLicitacaoRealizada').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdLicitacao').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtDsObservacoesLicitacaoRealizada').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('ckbSnRealizada').setValue('S');
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('ckbSnParticipa').setValue('S');
	},
	
	telaMovimentoFichaServicoEdit_gridItLicitacaoRealizadaFichaServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			var snParticipa = 'N';
			if ( record.get('SN_PARTICIPA') == 'Sim' ) {
				snParticipa = 'S';
			}
			var snRealizada = 'N';
			if ( record.get('SN_REALIZADA') == 'Sim' ) {
				snRealizada = 'S';
			}
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdOsLicitacaoRealizada').setValue(record.get('CD_OS_LICITACAO'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdLicitacao').setValue(record.get('CD_LICITACAO'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtDsObservacoesLicitacaoRealizada').setValue(record.get('DS_OBSERVACOES'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('ckbSnParticipa').setValue(snParticipa);
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('ckbSnRealizada').setValue(snRealizada);
		}
	},
	
	telaMovimentoFichaServicoEdit_btnExcluirLicitacaoRealizadaFichaServico_click: function(button) {
		var store = this.getMovimentoMovimentoFichaServicoLicitacaoRealizadaFichaServicoStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum licitação foi inserida na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('gridItLicitacaoRealizadaFichaServico').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir esta licitação?",
					minWidth: 200,
					modal: true,
					buttons: Ext.Msg.YESNO,
					fn: function(btn) {
						if (btn == 'yes') {
							store.remove(record[0]);
						};
					},
					icon: Ext.Msg.QUESTION
				});				
			} else { 		
				Ext.msgbox.msg('Aviso', 'Selecione primeiro uma licitação na lista...', 'W', 8000);		
			}
		}
	},
	
	telaMovimentoFichaServicoEdit_btnSalvarLicitacaoRealizadaFichaServico_click: function(button) {
		var controller = this;
		if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdLicitacao').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o código da licitação...', 'W', 8000);			
		} else if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtDsObservacoesLicitacaoRealizada').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar as observações da licitação...', 'W', 8000);			
		} else {
			var CdOsLicitacaoRealizada = controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdOsLicitacaoRealizada').getValue();
			var store = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizadaFichaServicoStoreStore();

			var participa = 'Não';
			if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('ckbSnParticipa').getValue() == true ) {
				participa = 'Sim';	
			}
			var realizada = 'Não';
			if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('ckbSnRealizada').getValue() == true ) {
				realizada = 'Sim';	
			}
			
			// Para alterar um visita
			if ( CdOsLicitacaoRealizada != "" && CdOsLicitacaoRealizada != null ) {
				// percorer a lista e alterar a licitação selecionada
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_OS_LICITACAO') == CdOsLicitacaoRealizada ) {
							rec.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
							rec.set('CD_LICITACAO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdLicitacao').getValue());
							rec.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtDsObservacoesLicitacaoRealizada').getValue());
							rec.set('SN_PARTICIPA',participa);
							rec.set('SN_REALIZADA',realizada);
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Movimento.MovimentoFichaServico.LicitacaoRealizadaFichaServicoModel');
				record.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
				record.set('CD_OS_LICITACAO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdOsLicitacaoRealizada').getValue());
				record.set('CD_LICITACAO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtCdLicitacao').getValue());
				record.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabLicitacoesRealizadas').getComponent('edtDsObservacoesLicitacaoRealizada').getValue());
				record.set('SN_PARTICIPA',participa);
				record.set('SN_REALIZADA',realizada);
				store.add(record);
			}
			controller.limpaDadosLicitacaoRealizada();
		}
	},
	/* Fim das ações de licitação realizada */
	
	
	/* Início das ações comerciais ---------------------------------------------------------------*/
	telaMovimentoFichaServicoEdit_btnNovaAcaoComercialFichaServico_click: function(button) {
		this.limpaDadosAcaoComercial();
	},
	
	limpaDadosAcaoComercial: function() {
		var controller = this;
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtCdOsAcaoComercial').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDtAcaoComercial').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDsObservacoesAcaoComercial').setValue(null);
	},
	
	telaMovimentoFichaServicoEdit_gridItAcaoComercialFichaServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtCdOsAcaoComercial').setValue(record.get('CD_OS_ACAO_COMERCIAL'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDtAcaoComercial').setValue(record.get('DT_ACAO_COMERCIAL'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDsObservacoesAcaoComercial').setValue(record.get('DS_OBSERVACOES'));
		}
	},
	
	telaMovimentoFichaServicoEdit_btnExcluirAcaoComercialFichaServico_click: function(button) {
		var store = this.getMovimentoMovimentoFichaServicoAcaoComercialFichaServicoStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhuma ação comercial foi inserida na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('gridItAcaoComercialFichaServico').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir esta ação comercial?",
					minWidth: 200,
					modal: true,
					buttons: Ext.Msg.YESNO,
					fn: function(btn) {
						if (btn == 'yes') {
							store.remove(record[0]);
						};
					},
					icon: Ext.Msg.QUESTION
				});				
			} else { 		
				Ext.msgbox.msg('Aviso', 'Selecione primeiro uma ação comercial na lista...', 'W', 8000);		
			}
		}
	},
	
	telaMovimentoFichaServicoEdit_btnSalvarAcaoComercialFichaServico_click: function(button) {
		var controller = this;

		if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDsObservacoesAcaoComercial').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar qual ação comercial foi adotada...', 'W', 8000);			
		} else if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDtAcaoComercial').getValue() == "" || 
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDtAcaoComercial').getValue() == null ) {
			Ext.msgbox.msg('Aviso', 'É necessário informar a data da ação comercial...', 'W', 8000);	
		} else {
			var cdOsAcaoComercial = controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtCdOsAcaoComercial').getValue();
			var store = controller.getMovimentoMovimentoFichaServicoAcaoComercialFichaServicoStoreStore();

			// Para alterar uma ação comercial
			if ( cdOsAcaoComercial != "" && cdOsAcaoComercial != null ) {
				// percorer a lista e alterar a ação comercial selecionada
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_OS_ACAO_COMERCIAL') == cdOsAcaoComercial ) {
							rec.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
							rec.set('DT_ACAO_COMERCIAL',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDtAcaoComercial').getValue());
							rec.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDsObservacoesAcaoComercial').getValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Movimento.MovimentoFichaServico.AcaoComercialFichaServicoModel');
				record.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
				record.set('CD_OS_ACAO_COMERCIAL',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtCdOsAcaoComercial').getValue());
				record.set('DT_ACAO_COMERCIAL',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDtAcaoComercial').getValue());
				record.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabAcoesComerciaisRealizar').getComponent('edtDsObservacoesAcaoComercial').getValue());
				store.add(record);
			}
			controller.limpaDadosAcaoComercial();
		}
	},
	/* Fim das ações comerciais */

	
	/* Início das ações de investimento ----------------------------------------------------------*/
	telaMovimentoFichaServicoEdit_btnExcluirInvestimentoFichaServico_click: function(button) {
		var store = this.getMovimentoMovimentoFichaServicoInvestimentoFichaServicoStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum investimento foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('gridItInvestimentoFichaServico').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir este investimento?",
					minWidth: 200,
					modal: true,
					buttons: Ext.Msg.YESNO,
					fn: function(btn) {
						if (btn == 'yes') {
							store.remove(record[0]);
						};
					},
					icon: Ext.Msg.QUESTION
				});				
			} else { 		
				Ext.msgbox.msg('Aviso', 'Selecione primeiro um investimento na lista...', 'W', 8000);		
			}
		}
	},

	telaMovimentoFichaServicoEdit_btnNovoInvestimentoFichaServico_click: function(button) {
		this.limpaDadosInvestimento();
	},
	
	telaMovimentoFichaServicoEdit_btnSalvarInvestimentoFichaServico_click: function(button) {
		var controller = this;

		if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtDsInvestimento').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar a descrição do investimento...', 'W', 8000);	
		} else {
			var cdOsInvestimento = controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtCdOsInvestimento').getValue();
			var store = controller.getMovimentoMovimentoFichaServicoInvestimentoFichaServicoStoreStore();
			// Para alterar um investimento
			if ( cdOsInvestimento != "" && cdOsInvestimento != null ) {
				// percorer a lista e alterar o investimento selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_OS_INVESTIMENTO') == cdOsInvestimento ) {
							rec.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
							rec.set('DS_INVESTIMENTO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtDsInvestimento').getValue());
							rec.set('VL_INVESTIMENTO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtVlInvestimento').getValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Movimento.MovimentoFichaServico.InvestimentoFichaServicoModel');
				record.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
				record.set('CD_INVESTIMENTO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtCdOsInvestimento').getValue());
				record.set('DS_INVESTIMENTO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtDsInvestimento').getValue());
				record.set('VL_INVESTIMENTO',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtVlInvestimento').getValue());
				store.add(record);
			}
			controller.limpaDadosInvestimento();
		}
	},
	
	limpaDadosInvestimento: function() {
		var controller = this;
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtCdOsInvestimento').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtDsInvestimento').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtVlInvestimento').setValue(null);
	},
	
	telaMovimentoFichaServicoEdit_gridItInvestimentoFichaServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtCdOsInvestimento').setValue(record.get('CD_OS_INVESTIMENTO'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtDsInvestimento').setValue(record.get('DS_INVESTIMENTO'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabInvestimentos').getComponent('edtVlInvestimento').setValue(record.get('VL_INVESTIMENTO'));
		}
	},
	/* Fim das ações de investimento */
	
	
	/* Início das ações da visita ---------------------------------------------------------*/
	telaMovimentoFichaServicoEdit_btnNovoItVisitaFichaServico_click: function(button) {
		this.limpaDadosVisita();
	},
	
	telaMovimentoFichaServicoEdit_gridItVisitaFichaServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtCdOsVisita').setValue(record.get('CD_OS_VISITA'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDtVisita').setValue(record.get('DT_VISITA'));
			controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDsObservacoesVisita').setValue(record.get('DS_OBSERVACOES'));
		}
	},
	
	telaMovimentoFichaServicoEdit_btnExcluirItVisitaFichaServico_click: function(button) {
		var store = this.getMovimentoMovimentoFichaServicoVisitaFichaServicoStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhuma visita foi inserida na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('gridItVisitaFichaServico').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir esta visita?",
					minWidth: 200,
					modal: true,
					buttons: Ext.Msg.YESNO,
					fn: function(btn) {
						if (btn == 'yes') {
							store.remove(record[0]);
						};
					},
					icon: Ext.Msg.QUESTION
				});				
			} else { 		
				Ext.msgbox.msg('Aviso', 'Selecione primeiro uma visita na lista...', 'W', 8000);		
			}
		}
	},

	telaMovimentoFichaServicoEdit_btnSalvarItVisitaFichaServico_click: function(button) {
		var controller = this;

		if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDtVisita').getValue() == "" ||
		    controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDtVisita').getValue() == null) {
			Ext.msgbox.msg('Aviso', 'É necessário informar a data da visita...', 'W', 8000);	
		} else if (controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDsObservacoesVisita').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o que foi observado na visita...', 'W', 8000);	
		} else {
			var cdOsVisita = controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtCdOsVisita').getValue();
			var store = controller.getMovimentoMovimentoFichaServicoVisitaFichaServicoStoreStore();

			// Para alterar um visita
			if ( cdOsVisita != "" && cdOsVisita != null ) {
				// percorer a lista e alterar o visita selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_OS_VISITA') == cdOsVisita ) {
							rec.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
							rec.set('DT_VISITA',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDtVisita').getValue());
							rec.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDsObservacoesVisita').getValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Movimento.MovimentoFichaServico.VisitaFichaServicoModel');
				record.set('NR_OS',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdOs').getValue());
				record.set('CD_OS_VISITA',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtCdOsVisita').getValue());
				record.set('DT_VISITA',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDtVisita').getValue());
				record.set('DS_OBSERVACOES',controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDsObservacoesVisita').getValue());
				store.add(record);
			}
			controller.limpaDadosVisita();
		}
	},

	limpaDadosVisita: function() {
		var controller = this;
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtCdOsVisita').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDtVisita').setValue(null);
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('pnlItensFichaServico').getComponent('tabVisita').getComponent('edtDsObservacoesVisita').setValue(null);
	},
	/* Fim das ações da visita */

	telaMovimentoFichaServicoEdit_cboCdPessoaPj_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdPessoaPj').setValue(newValue);
	},

	telaMovimentoFichaServicoEdit_cboCdTipoServico_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdTipoServico').setValue(newValue);
	},

	telaMovimentoFichaServicoEdit_cboCdAreaAtuacao_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdAreaAtuacao').setValue(newValue);
	},

	telaMovimentoFichaServicoEdit_cboCdStatusFicha_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdStatusFicha').setValue(newValue);
	},

	pesquisarFichaServico: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getMovimentoMovimentoFichaServicoFichaServicoStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaFichaServico&nmRazaoSocial='+controller.getTelaMovimentoFichaServico().getComponent('panPesquisaFichaServico').getComponent('edtNmRazaoClienteFichaServicoPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaMovimentoFichaServico().setLoading('Aguarde...');
		
		controller.getTelaMovimentoFichaServico().getComponent('gridFichaServico').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaMovimentoFichaServico().getComponent('gridFichaServico') != undefined) {
					controller.getTelaMovimentoFichaServico().getComponent('gridFichaServico').getSelectionModel().select(0); 
				}
			} else {
				controller.getMovimentoMovimentoFichaServicoFichaServicoStoreStore().removeAll();
			}
			controller.getTelaMovimentoFichaServico().setLoading(false);
		});
	},	
	
	telaMovimentoFichaServico_afterrender: function(panel) {
		this.pesquisarFichaServico();
	},
	
	telaMovimentoFichaServico_beforedestroy: function(panel) {
		this.getMovimentoMovimentoFichaServicoFichaServicoStoreStore().removeAll();
	},

	telaMovimentoFichaServicoEdit_beforedestroy: function(panel) {
		this.getMovimentoMovimentoFichaServicoVisitaFichaServicoStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoVisitaFichaServicoDbStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoContratoAnteriorFichaServicoStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoContratoAnteriorFichaServicoDbStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoAcaoComercialFichaServicoStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoAcaoComercialFichaServicoDbStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoLicitacaoRealizarFichaServicoStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoLicitacaoRealizarFichaServicoDbStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoLicitacaoRealizadaFichaServicoStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoLicitacaoRealizadaFichaServicoDbStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoInvestimentoFichaServicoStoreStore().removeAll();
		this.getMovimentoMovimentoFichaServicoInvestimentoFichaServicoDbStoreStore().removeAll();
	},

	telaMovimentoFichaServico_btnNovoFichaServico_click: function(button) {
		Ext.create('erp.view.Movimento.MovimentoFichaServico.TelaMovimentoFichaServicoEdit').show();
		
		this.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtNrSequencialEmpresa').focus(false,300); 
	},
	
	prepararEdicaoFichaServico: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Movimento.MovimentoFichaServico.TelaMovimentoFichaServicoEdit').show();
		
		var storePessoaPj = controller.getGenericoPessoaPjClienteStoreStore();
		storePessoaPj.load({params:{cdPessoaPj: record.get('CD_PESSOA_PJ')}});
		storePessoaPj.on('load',  function handleLoad(st,records) {
			if (storePessoaPj.getCount() > 0) {
				controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdPessoaPj').setValue(records[0].get('CD_PESSOA_PJ'));
				controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdPessoaPj').setRawValue(records[0].get('NM_RAZAO_SOCIAL'));
				controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdPessoaPj').setValue(records[0].get('CD_PESSOA_PJ'));
			}
			storePessoaPj.un('load',handleLoad);
			
			var storeTipoServico = controller.getGenericoTipoServicoStoreStore();
			storeTipoServico.load({params:{cdTipoServico: record.get('CD_TIPO_SERVICO')}});
			storeTipoServico.on('load',  function handleLoad(st,records) {
				if (storeTipoServico.getCount() > 0) {
					controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdTipoServico').setValue(records[0].get('CD_TIPO_SERVICO'));
					controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdTipoServico').setRawValue(records[0].get('DS_TIPO_SERVICO'));
					controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdTipoServico').setValue(records[0].get('CD_TIPO_SERVICO'));
				}
				storeTipoServico.un('load',handleLoad);

				var storeAreaAtuacao = controller.getGenericoAreaAtuacaoStoreStore();
				storeAreaAtuacao.load({params:{cdAreaAtuacao: record.get('CD_AREA_ATUACAO')}});
				storeAreaAtuacao.on('load',  function handleLoad(st,records) {
					if (storeAreaAtuacao.getCount() > 0) {
						controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdAreaAtuacao').setValue(records[0].get('CD_AREA_ATUACAO'));
						controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdAreaAtuacao').setRawValue(records[0].get('DS_AREA_ATUACAO'));
						controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdAreaAtuacao').setValue(records[0].get('CD_AREA_ATUACAO'));
					}
					storeAreaAtuacao.un('load',handleLoad);

					var storeStatusFicha = controller.getGenericoStatusFichaStoreStore();
					storeStatusFicha.load({params:{cdStatusFicha: record.get('CD_STATUS_FICHA')}});
					storeStatusFicha.on('load',  function handleLoad(st,records) {
						if (storeStatusFicha.getCount() > 0) {
							controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdStatusFicha').setValue(records[0].get('CD_STATUS_FICHA'));
							controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('cboCdStatusFicha').setRawValue(records[0].get('DS_STATUS_FICHA'));
							controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtCdStatusFicha').setValue(records[0].get('CD_STATUS_FICHA'));
						}
						storeStatusFicha.un('load',handleLoad);
					});
				});
			});
		});

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		win.setLoading('Carregando...');
						
		/* 1º) carregar o grid de contratos */
		controller.pesquisarItContratoAnteriorFichaServico(record.get('CD_OS'));

		/* 2º) carregar o grid de investimentos */
		controller.pesquisarItInvestimentoFichaServico(record.get('CD_OS'));
		
		/* 3º) carregar o grid de licitações realizadas */
		controller.pesquisarItLicitacaoRealizadaFichaServico(record.get('CD_OS'));
		
		/* 4º) carregar o grid de visitas */
		controller.pesquisarItVisitaFichaServico(record.get('CD_OS'));

		/* 5º) carregar o grid de ações comerciais */
		controller.pesquisarItAcaoComercialFichaServico(record.get('CD_OS'));
		
		/* 6º) carregar o grid de licitações a realizar */
		controller.pesquisarItLicitacaoRealizarFichaServico(record.get('CD_OS'));

		win.setLoading(false);
		
		controller.getTelaMovimentoFichaServicoEdit().down('form').getComponent('edtNrSequencialEmpresa').focus(false,300);	
	},	

	/* 1º) carregar o grid de contratos anteriores */
	pesquisarItContratoAnteriorFichaServico: function(cdOs) {
		var controller = this;
		var storeDb = controller.getMovimentoMovimentoFichaServicoContratoAnteriorFichaServicoDbStoreStore();
		var storeGrid = controller.getMovimentoMovimentoFichaServicoContratoAnteriorFichaServicoStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaContratoAnteriorFichaServico&cdOs='+cdOs});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaMovimentoFichaServicoEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	/* 2º) carregar o grid de investimentos */
	pesquisarItInvestimentoFichaServico: function(cdOs) {
		var controller = this;
		var storeDb = controller.getMovimentoMovimentoFichaServicoInvestimentoFichaServicoDbStoreStore();
		var storeGrid = controller.getMovimentoMovimentoFichaServicoInvestimentoFichaServicoStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaInvestimentoFichaServico&cdOs='+cdOs});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaMovimentoFichaServicoEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	/* 3º) carregar o grid de licitações realizadas */
	pesquisarItLicitacaoRealizadaFichaServico: function(cdOs) {
		var controller = this;
		var storeDb = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizadaFichaServicoDbStoreStore();
		var storeGrid = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizadaFichaServicoStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaLicitacaoRealizadaFichaServico&cdOs='+cdOs});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaMovimentoFichaServicoEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	

	/* 4º) carregar o grid de visitas */
	pesquisarItVisitaFichaServico: function(cdOs) {
		var controller = this;
		var storeDb = controller.getMovimentoMovimentoFichaServicoVisitaFichaServicoDbStoreStore();
		var storeGrid = controller.getMovimentoMovimentoFichaServicoVisitaFichaServicoStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaVisitaFichaServico&cdOs='+cdOs});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaMovimentoFichaServicoEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	/* 5º) carregar o grid de ações comerciais */
	pesquisarItAcaoComercialFichaServico: function(cdOs) {
		var controller = this;
		var storeDb = controller.getMovimentoMovimentoFichaServicoAcaoComercialFichaServicoDbStoreStore();
		var storeGrid = controller.getMovimentoMovimentoFichaServicoAcaoComercialFichaServicoStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaAcaoComercialFichaServico&cdOs='+cdOs});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaMovimentoFichaServicoEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	/* 6º) carregar o grid de licitações a realizar */
	pesquisarItLicitacaoRealizarFichaServico: function(cdOs) {
		var controller = this;
		var storeDb = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizarFichaServicoDbStoreStore();
		var storeGrid = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizarFichaServicoStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=getListaLicitacaoRealizarFichaServico&cdOs='+cdOs});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaMovimentoFichaServicoEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	telaMovimentoFichaServico_btnEditarFichaServico_click: function(button) {
		var record = this.getTelaMovimentoFichaServico().getComponent('gridFichaServico').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoFichaServico(record[0]);
		}
	},

	telaMovimentoFichaServico_gridFichaServico_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoFichaServico(record);
		}
	},

	telaMovimentoFichaServico_btnExcluirFichaServico_click: function(button) {
		var controller = this;
		var record = controller.getTelaMovimentoFichaServico().getComponent('gridFichaServico').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaMovimentoFichaServico().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op=excluir',
							params: {
								cdOs: record[0].get('CD_OS')	
							},
							success: function(response) {
								controller.getTelaMovimentoFichaServico().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarFichaServico();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaMovimentoFichaServico().setLoading(false);
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
	
	telaMovimentoFichaServico_btnAtualizarLista_click: function(button) {
		this.pesquisarFichaServico();	
	},	
	
	telaMovimentoFichaServico_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaMovimentoFichaServico().getComponent('panPesquisaFichaServico').isHidden()) {
			this.getTelaMovimentoFichaServico().getComponent('panPesquisaFichaServico').setVisible(true);
		} else {
			this.getTelaMovimentoFichaServico().getComponent('panPesquisaFichaServico').setVisible(false);
		}
	},

	telaMovimentoFichaServicoEdit_btnSalvar_click: function(button) {
		var controller = this;
		var st = this.getMovimentoMovimentoFichaServicoFichaServicoStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Movimento.MovimentoFichaServico.FichaServicoModel');
		var reg = Ext.create(model, form.getValues(false,false,false,false));
		
		if (form.isValid()) {
			button.setDisabled(true);
			win.setLoading('Aguarde...');
			if (reg.phantom) {
				var op = 'inserir';
			} else {
				var op =  'alterar';
			}
			
			//****************************************************************************
			// 1º) Percorre os contratos anteriores e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItContratosAnteriores = controller.getMovimentoMovimentoFichaServicoContratoAnteriorFichaServicoStoreStore();
			var listaItContratosAnteriores = new Array();
			storeItContratosAnteriores.data.each(function(item, index, total) {
				Ext.Array.include(listaItContratosAnteriores,item.getData());
			});	
			reg.set('IT_CONTRATOS_ANTERIORES',Ext.JSON.encode(listaItContratosAnteriores));

			//****************************************************************************
			// 2º) Percorre os investimentos e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItInvestimento = controller.getMovimentoMovimentoFichaServicoInvestimentoFichaServicoStoreStore();
			var listaItInvestimento = new Array();
			storeItInvestimento.data.each(function(item, index, total) {
				Ext.Array.include(listaItInvestimento,item.getData());
			});	
			reg.set('IT_INVESTIMENTOS',Ext.JSON.encode(listaItInvestimento));

			//****************************************************************************
			// 3º) Percorre as licitações realizadas e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItLicitacaoRealizada = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizadaFichaServicoStoreStore();
			var listaItLicitacaoRealizada = new Array();
			storeItLicitacaoRealizada.data.each(function(item, index, total) {
				Ext.Array.include(listaItLicitacaoRealizada,item.getData());
			});	
			reg.set('IT_LICITACOES_REALIZADAS',Ext.JSON.encode(listaItLicitacaoRealizada));
			
			//****************************************************************************
			// 4º) Percorre as visitas e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItVisita = controller.getMovimentoMovimentoFichaServicoVisitaFichaServicoStoreStore();
			var listaItVisita = new Array();
			storeItVisita.data.each(function(item, index, total) {
				Ext.Array.include(listaItVisita,item.getData());
			});	
			reg.set('IT_VISITAS',Ext.JSON.encode(listaItVisita));
			
			//****************************************************************************
			// 5º) Percorre as ações comerciais e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItAcaoComercial = controller.getMovimentoMovimentoFichaServicoAcaoComercialFichaServicoStoreStore();
			var listaItAcaoComercial = new Array();
			storeItAcaoComercial.data.each(function(item, index, total) {
				Ext.Array.include(listaItAcaoComercial,item.getData());
			});	
			reg.set('IT_ACOES_COMERCIAIS',Ext.JSON.encode(listaItAcaoComercial));
			
			//****************************************************************************
			// 6º) Percorre as licitações a realizar e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItLicitacaoRealizar = controller.getMovimentoMovimentoFichaServicoLicitacaoRealizarFichaServicoStoreStore();
			var listaItLicitacaoRealizar = new Array();
			storeItLicitacaoRealizar.data.each(function(item, index, total) {
				Ext.Array.include(listaItLicitacaoRealizar,item.getData());
			});	
			reg.set('IT_LICITACOES_REALIZAR',Ext.JSON.encode(listaItLicitacaoRealizar));
			
			Ext.Ajax.request({
				url: '../erp/controller/Movimento/MovimentoFichaServicoController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarFichaServico();
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

	MovimentoFichaServico_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarFichaServico();
	},
	
	MovimentoFichaServico_btnLimparPesquisa_click: function(button) {
		this.getTelaMovimentoFichaServico().getComponent('panPesquisaFichaServico').getComponent('edtNmRazaoClienteFichaServicoPesquisa').setValue('');
		this.pesquisarFichaServico();
	}
	
});