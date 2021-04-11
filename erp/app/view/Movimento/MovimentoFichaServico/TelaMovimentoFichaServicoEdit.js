Ext.define('erp.view.Movimento.MovimentoFichaServico.TelaMovimentoFichaServicoEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaMovimentoFichaServicoEdit',
	layout: 'fit',
    width: 795,  
    height: 510, 
    resizable: false,
	modal: true,
	title: 'Ficha de Serviço',
	editMode: false,
	items: [
		{
			xtype: 'form',
			layout: 'absolute',
			border: false,
			defaults: {
				labelAlign: 'top',
				labelSeparator: ''
			},
			items: [
				{
					xtype : "numberfield",
					itemId : "edtCdOs",
					name: 'CD_OS',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "numberfield",
					fieldLabel: 'Cód. da Ficha',
					itemId : "edtNrSequencialEmpresa",
					name: 'NR_SEQUENCIAL_EMPRESA',
					width: 91,
					allowBlank: false
				},
				{
					xtype : "numberfield",
					itemId : "edtCdPessoaPj",
					name: 'CD_PESSOA_PJ',
					x:108,y:8,
					width: 60,
					hidden: true
				},
				{
					x:108,y:8, 
					fieldLabel: 'Cliente/Instituição',
					itemId : "cboCdPessoaPj",
					width: 242,
					allowBlank: false,
					xtype : "combobox",
					store: 'Generico.PessoaPjClienteStore',
					displayField: 'NM_RAZAO_SOCIAL',
					valueField: 'CD_PESSOA_PJ',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'nmRazaoSocial',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}	
				},
				{
					xtype : "numberfield",
					itemId : "edtCdTipoServico",
					name: 'CD_TIPO_SERVICO',
					hidden: true
				},
				{
					x:360,y:8,
					fieldLabel: 'Tipo de Serviço',
					itemId : "cboCdTipoServico",
					width: 242,
					allowBlank: false,
					xtype : "combobox",
					store: 'Generico.TipoServicoStore',
					displayField: 'DS_TIPO_SERVICO',
					valueField: 'CD_TIPO_SERVICO',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'dsTipoServico',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}
				},
				{
					x:612,y:8,
					xtype : "textfield",
					fieldLabel: 'Contratante',
					itemId : "edtNmContratante",
					width: 160,
					allowBlank: false,
					name: 'NM_CONTRATANTE'
				},
				{
					xtype : "numberfield",
					itemId : "edtCdAreaAtuacao",
					name: 'CD_AREA_ATUACAO',
					hidden: true
				},
				{
					x:8,y:56,
					fieldLabel: 'Área de Atuação',
					itemId : "cboCdAreaAtuacao",
					width: 340,
					allowBlank: false,
					xtype : "combobox",
					store: 'Generico.AreaAtuacaoStore',
					displayField: 'DS_AREA_ATUACAO',
					valueField: 'CD_AREA_ATUACAO',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'dsAreaAtuacao',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}
				},
				{
					xtype : "numberfield",
					itemId : "edtCdStatusFicha",
					name: 'CD_STATUS_FICHA',
					hidden: true
				},
				{
					x:360,y:56,
					fieldLabel: 'Status da Ficha',
					itemId : "cboCdStatusFicha",
					width: 242,
					allowBlank: false,
					xtype : "combobox",
					store: 'Generico.StatusFichaStore',
					displayField: 'DS_STATUS_FICHA',
					valueField: 'CD_STATUS_FICHA',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'dsStatusFicha',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}
				},
				{
					x:612,y:56,
					fieldLabel: 'Total da Ficha',
					itemId : "edtVlTotalOs",
					width: 160,
					xtype : "textfield",
					plugins: "textmask",
					mask: "R$ #999.999.999.990,00",
					money: true,
					name: 'VL_TOTAL_OS'
				},
				{
					x:8,y:104,
					xtype : "textfield",
					fieldLabel: 'Perfil do gestor',
					itemId : "edtDsPerfilGestor",
					width: 340,
					name: 'DS_PERFIL_GESTOR'
				},
				{
					x:360,y:104,
					xtype : "textfield",
					fieldLabel: 'Barreiras',
					itemId : "edtDsBarreira",
					width: 412,
					name: 'DS_BARREIRA'
				},

				// Inicio do TAB
                {
					x:8,y:154,
					xtype: 'tabpanel',
					activeTab: 0,
					itemId :'pnlItensFichaServico',
					width: 765,
					height: 287,
					items : [
						/* Contratos Anteriores */
						{
							title: 'Contratos Anteriores',
							layout: 'absolute',
							itemId : 'tabContartosAnteriores',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdOsContrato",
									name: 'CD_OS_CONTRATO',
									hidden: true
								},
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Descrição do Contrato',
									itemId : "edtDsObservacoesContrato",
									width: 670,
									name: 'DS_OBSERVACOES'
								},
								{
									x:688,y:25,
									xtype : "button",
									itemId: 'btnNovoContratoAnteriorFichaServico',
									tooltip: '<b>Incluir um novo contrato na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:711,y:25,
									xtype : "button",
									itemId: 'btnSalvarContratoAnteriorFichaServico',
									tooltip: '<b>Salvar o contrato na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:734,y:25,
									xtype : "button",
									itemId: 'btnExcluirContratoAnteriorFichaServico',
									tooltip: '<b>Excluir o contrato da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:56,
									xtype : "telaMovimentoFichaServicoEdit_gridItContratoAnteriorFichaServico",
									itemId: 'gridItContratoAnteriorFichaServico',
									width: 748,
									height: 195,
									border : true
								}
							]
						},
						/* Investimento */
						{
							title: 'Investimentos',
							layout: 'absolute',
							itemId : 'tabInvestimentos',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdOsInvestimento",
									name: 'CD_OS_INVESTIMENTO',
									hidden: true
								},
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Investimento',
									itemId : "edtDsInvestimento",
									width: 540,
									name: 'DS_INVESTIMENTO'
								},
								{
									x:558,y:8,
									fieldLabel: 'Vlr. do Investimento',
									itemId : "edtVlInvestimento",
									width: 120,
									xtype : "textfield",
									plugins: "textmask",
									mask: "R$ #999.999.999.990,00",
									money: true,
									name: 'VL_INVESTIMENTO'
								},
								{
									x:688,y:25,
									xtype : "button",
									itemId: 'btnNovoInvestimentoFichaServico',
									tooltip: '<b>Incluir um novo investimento na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:711,y:25,
									xtype : "button",
									itemId: 'btnSalvarInvestimentoFichaServico',
									tooltip: '<b>Salvar o investimento na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:734,y:25,
									xtype : "button",
									itemId: 'btnExcluirInvestimentoFichaServico',
									tooltip: '<b>Excluir o investimento da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:56,
									xtype : "telaMovimentoFichaServicoEdit_gridItInvestimentoFichaServico",
									itemId: 'gridItInvestimentoFichaServico',
									width: 748,
									height: 195,
									border : true
								}
							]
						},
						/* Licitações realizadas */
						{
							title: 'Licitações Realizadas',
							layout: 'absolute',
							itemId : 'tabLicitacoesRealizadas',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdOsLicitacaoRealizada",
									name: 'CD_OS_LICITACAO',
									hidden: true
								},
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Licitação',
									itemId : "edtCdLicitacao",
									width: 90,
									name: 'CD_LICITACAO',
									listeners: {
										blur: function(){
											this.setValue(this.getValue().trim());
										},
										change: function(){
											this.setValue(this.getValue().toUpperCase());
										}
									}
								},
								{					
									x:108,y:28,
									xtype : "checkbox",
									boxLabel: 'Participa',
									itemId : "ckbSnParticipa",
									inputValue: 'S',
									uncheckedValue: 'N',
									name: 'SN_PARTICIPA'
								},
								{
									x:178,y:8,
									xtype : "textfield",
									fieldLabel: 'Observações',
									itemId : "edtDsObservacoesLicitacaoRealizada",
									width: 500,
									name: 'DS_OBSERVACOES'
								},
								{					
									x:508,y:8,
									xtype : "checkbox",
									boxLabel: 'Realizada',
									itemId : "ckbSnRealizada",
									inputValue: 'S',
									uncheckedValue: 'N',
									name: 'SN_REALIZADA',
									checked: true,
									hidden: true
								},
								{
									x:688,y:25,
									xtype : "button",
									itemId: 'btnNovaLicitacaoRealizadaFichaServico',
									tooltip: '<b>Incluir uma nova licitação realizada na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:711,y:25,
									xtype : "button",
									itemId: 'btnSalvarLicitacaoRealizadaFichaServico',
									tooltip: '<b>Salvar uma nova licitação realizada na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:734,y:25,
									xtype : "button",
									itemId: 'btnExcluirLicitacaoRealizadaFichaServico',
									tooltip: '<b>Excluir uma nova licitação realizada da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:56,
									xtype : "telaMovimentoFichaServicoEdit_gridItLicitacaoRealizadaFichaServico",
									itemId: 'gridItLicitacaoRealizadaFichaServico',
									width: 748,
									height: 195,
									border : true
								}
							]
						},
						/* Visita */
						{
							title: 'Visitas e Anotações',
							layout: 'absolute',
							itemId : 'tabVisita',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdOsVisita",
									name: 'CD_OS_VISITA',
									hidden: true
								},
								{
									x:8,y:8,
									fieldLabel: 'Data',
									xtype : "datefield",
									itemId : "edtDtVisita",
									format: 'd/m/Y',
									submitFormat: 'Y-m-d',
									width: 130,
									name: 'DT_VISITA'
								},
								{
									x:148,y:8,
									xtype : "textfield",
									fieldLabel: 'Observações',
									itemId : "edtDsObservacoesVisita",
									width: 530,
									name: 'DS_OBSERVACOES'
								},
								{
									x:688,y:25,
									xtype : "button",
									itemId: 'btnNovoItVisitaFichaServico',
									tooltip: '<b>Incluir uma nova visita na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:711,y:25,
									xtype : "button",
									itemId: 'btnSalvarItVisitaFichaServico',
									tooltip: '<b>Salvar uma visita na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:734,y:25,
									xtype : "button",
									itemId: 'btnExcluirItVisitaFichaServico',
									tooltip: '<b>Excluir uma visita da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:56,
									xtype : "telaMovimentoFichaServicoEdit_gridItVisitaFichaServico",
									itemId: 'gridItVisitaFichaServico',
									width: 748,
									height: 195,
									border : true
								}
							]
						},
						/* Ações Comerciais a Realizar */
						{
							title: 'Ações Comerciais a Realizar',
							layout: 'absolute',
							itemId : 'tabAcoesComerciaisRealizar',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdOsAcaoComercial",
									name: 'CD_OS_ACAO_COMERCIAL',
									hidden: true
								},
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Observações',
									itemId : "edtDsObservacoesAcaoComercial",
									width: 530,
									name: 'DS_OBSERVACOES'
								},
								{
									x:548,y:8,
									fieldLabel: 'Data',
									xtype : "datefield",
									itemId : "edtDtAcaoComercial",
									format: 'd/m/Y',
									submitFormat: 'Y-m-d',
									width: 130,
									name: 'DT_ACAO_COMERCIAL'
								},
								{
									x:688,y:25,
									xtype : "button",
									itemId: 'btnNovaAcaoComercialFichaServico',
									tooltip: '<b>Incluir uma nova ação comercial na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:711,y:25,
									xtype : "button",
									itemId: 'btnSalvarAcaoComercialFichaServico',
									tooltip: '<b>Salvar uma ação comercial na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:734,y:25,
									xtype : "button",
									itemId: 'btnExcluirAcaoComercialFichaServico',
									tooltip: '<b>Excluir uma ação comercial da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:56,
									xtype : "telaMovimentoFichaServicoEdit_gridItAcaoComercialFichaServico",
									itemId: 'gridItAcaoComercialFichaServico',
									width: 748,
									height: 195,
									border : true
								}
							]
						},
						/* Licitações a Realizar */
						{
							title: 'Licitações a Realizar',
							layout: 'absolute',
							itemId : 'tabLicitacoesRealizar',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdOsLicitacaoRealizar",
									name: 'CD_OS_LICITACAO',
									hidden: true
								},
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Licitação',
									itemId : "edtCdLicitacaoRealizar",
									width: 90,
									name: 'CD_LICITACAO',
									listeners: {
										blur: function(){
											this.setValue(this.getValue().trim());
										},
										change: function(){
											this.setValue(this.getValue().toUpperCase());
										}
									}
								},
								{					
									x:108,y:28,
									xtype : "checkbox",
									boxLabel: 'Participa',
									itemId : "ckbSnParticipaLicitacaoRealizar",
									inputValue: 'S',
									uncheckedValue: 'N',
									name: 'SN_PARTICIPA'
								},
								{
									x:178,y:8,
									xtype : "textfield",
									fieldLabel: 'Observações',
									itemId : "edtDsObservacoesLicitacaoRealizar",
									width: 500,
									name: 'DS_OBSERVACOES'
								},
								{					
									x:508,y:8,
									xtype : "checkbox",
									boxLabel: 'Realizada',
									itemId : "ckbSnRealizadaLicitacaoRealizar",
									inputValue: 'S',
									uncheckedValue: 'N',
									name: 'SN_REALIZADA',
									checked: false,
									hidden: true
								},
								{
									x:688,y:25,
									xtype : "button",
									itemId: 'btnNovaLicitacaoRealizarFichaServico',
									tooltip: '<b>Incluir uma nova licitação a realizar na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:711,y:25,
									xtype : "button",
									itemId: 'btnSalvarLicitacaoRealizarFichaServico',
									tooltip: '<b>Salvar uma nova licitação a realizar na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:734,y:25,
									xtype : "button",
									itemId: 'btnExcluirLicitacaoRealizarFichaServico',
									tooltip: '<b>Excluir uma nova licitação a realizar da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:56,
									xtype : "telaMovimentoFichaServicoEdit_gridItLicitacaoRealizarFichaServico",
									itemId: 'gridItLicitacaoRealizarFichaServico',
									width: 748,
									height: 195,
									border : true
								}
							]
						}						
					]
				}	
			]
		}
    ],
	buttons: [ 
		{ 
		  itemId: 'btnSalvar',
		  width: 75,
		  height: 25,
		  text: 'Salvar',
		  iconCls: 'save_16'
		}
	]
});