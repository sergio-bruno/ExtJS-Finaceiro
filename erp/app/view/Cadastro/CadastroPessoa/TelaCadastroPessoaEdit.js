Ext.define('erp.view.Cadastro.CadastroPessoa.TelaCadastroPessoaEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroPessoaEdit',
	layout: 'fit',
    width: 590,  //Largura da janela 400
    height: 510, //Altura da janela  170 
    resizable: false,
	modal: true,
	title: 'Pessoa',
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
					itemId : "edtCdPessoa",
					name: 'CD_PESSOA',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Nome',
					itemId : "edtNmPessoa",
					width: 500,
					allowBlank: false,
					listeners: {
						blur: function(){
							this.setValue(this.getValue().trim());
						},
						change: function(){
							this.setValue(this.getValue().toUpperCase());
						}
					},
					name: 'NM_PESSOA'
				},
				{					
					x:523,y:30,
					xtype : "checkbox",
					boxLabel: 'Ativo',
					itemId : "ckbSnAtivo",
					inputValue: 'S',
					uncheckedValue: 'N',
					name: 'SN_ATIVO',
					//hidden: true
				},

				// Inicio do TAB
                {
					x:8,y:74,
					xtype: 'tabpanel',
					activeTab: 0,
					itemId :'pnlItensPessoa',
					width: 560,
					height: 340,
					items : [

						{
							title: 'Informações do Contato',
							layout: 'absolute',
							itemId : 'tabOutrasInformacoes',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									x:8,y:8,
									fieldLabel: 'Nascimento',
									xtype : "datefield",
									itemId : "edtDtNascimento",
									format: 'd/m/Y',
									submitFormat: 'Y-m-d',
									width: 100,
									name: 'DT_NASCIMENTO'
								},
								{
									xtype : "textfield",
									itemId : "edtTpSexo",
									name: 'TP_SEXO',
									hidden: true
								},
								{
									x:118,y:8,
									fieldLabel: 'Sexo',
									itemId : "cboTpSexo",
									width: 90,
									xtype : "combobox",
									store : [
												['M','Masculino'],
												['F','Feminino'],
												['O','Outros']
											],
									forceSelection: true
								},
								{
									xtype : "textfield",
									itemId : "edtTpSanguineo",
									name: 'TP_SANGUINEO',
									hidden: true
								},
								{
									x:218,y:8,
									fieldLabel: 'Tp. Sanguíneo',
									itemId : "cboTpSanguineo",
									width: 80,
									xtype : "combobox",
									store : [
												['A+','A+'],
												['A-','A-'],
												['B+','B+'], 
												['B-','B-'],  
												['AB+','AB+'],  
												['AB-','AB-'], 
												['O+','O+'], 
												['O-','O-'] 
											],
									forceSelection: true
								},
								{
									x:308,y:8,
									fieldLabel: 'Telefone',
									xtype : "textfield",
									itemId : "edtNrTelefone",
									width: 110,
									plugins: "textmask",
									mask: "(99) 9999-9999",
									name: 'NR_TELEFONE'
								},
								{
									x:428,y:8,
									fieldLabel: 'Celular',
									xtype : "textfield",
									itemId : "edtNrCelular",
									width: 120,
									plugins: "textmask",
									mask: "(99) 9 9999-9999",
									name: 'NR_CELULAR'
								},
								{
									x:8,y:56,
									xtype : "textfield",
									fieldLabel: 'E-mail',
									itemId : "edtDsEmail",
									width: 540,
									name: 'DS_EMAIL',
									vtype: 'email',
									listeners: {
										blur: function(){
											this.setValue(this.getValue().trim());
										},
										change: function(){
											this.setValue(this.getValue().toLowerCase());
										}
									}
								},
								{
									x:8,y:104,
									xtype : "textfield",
									fieldLabel: 'Nome do Pai',
									itemId : "edtNmPai",
									width: 265,
									name: 'NM_PAI'
								},
								{
									x:283,y:104,
									xtype : "textfield",
									fieldLabel: 'Nome da Mãe',
									itemId : "edtNmMae",
									width: 265,
									name: 'NM_MAE'
								},
								{
									x:8,y:152,
									xtype : "textfield",
									fieldLabel: 'Nome do Conjuge',
									itemId : "edtNmConjuge",
									width: 265,
									name: 'NM_CONJUGE'
								},
								{
									x:283,y:152,
									xtype : "textfield",
									fieldLabel: 'Naturalidade',
									itemId : "edtDsNaturalidade",
									width: 195,
									name: 'DS_NATURALIDADE'
								},
								{
									xtype : "textfield",
									itemId : "edtCdUfNaturalidade",
									name: 'CD_UF_NATURALIDADE',
									hidden: true
								},	
								{
									x:488,y:152,
									fieldLabel: 'UF',
									itemId : "cboCdUfNaturalidade",
									width: 60,
									xtype : "combobox",
									store : [
												['AC','AC'],
												['AL','AL'],
												['AM','AM'],
												['AP','AP'],
												['BA','BA'],
												['CE','CE'],
												['DF','DF'],
												['ES','ES'],
												['GO','GO'],
												['MA','MA'],
												['MG','MG'],
												['MS','MS'],
												['MT','MT'],
												['PA','PA'],
												['PB','PB'],
												['PE','PE'],
												['PI','PI'],
												['PR','PR'],
												['RJ','RJ'],
												['RN','RN'],
												['RO','RO'],
												['RR','RR'],
												['RS','RS'],
												['SC','SC'],
												['SE','SE'],
												['SP','SP'],
												['TO','TO']
											],
									forceSelection: true
								},
								{
									x:8,y:200,
									xtype : "textfield",
									fieldLabel: 'Nacionalidade',
									itemId : "edtDsNacionalidade",
									width: 265,
									name: 'DS_NACIONALIDADE'
								},
								{
									xtype : "numberfield",
									itemId : "edtCdEstadoCivil",
									name: 'CD_ESTADO_CIVIL',
									hidden: true
								},
								{
									x:283,y:200,
									fieldLabel: 'Estado Civil',
									itemId : "cboCdEstadoCivil",
									width: 265,
									xtype : "combobox",
									store: 'Generico.EstadoCivilStore',
									displayField: 'DS_ESTADO_CIVIL',
									valueField: 'CD_ESTADO_CIVIL',
									//pageSize: 30,
									queryParam: 'dsEstadoCivil',
									//allowBlank: false,
									forceSelection: true,
									minChars: 1,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								},
								{
									xtype : "numberfield",
									itemId : "edtCdEscolaridade",
									name: 'CD_ESCOLARIDADE',
									hidden: true
								},
								{
									x:8,y:248,
									fieldLabel: 'Escolaridade',
									itemId : "cboCdEscolaridade",
									width: 540,
									xtype : "combobox",
									store: 'Generico.EscolaridadeStore',
									displayField: 'DS_ESCOLARIDADE',
									valueField: 'CD_ESCOLARIDADE',
									//pageSize: 30,
									queryParam: 'dsEscolaridade',
									//allowBlank: false,
									forceSelection: true,
									minChars: 1,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								}
							]
						},
						{
							//Documentos
							title: 'Documentos',
							layout: 'absolute',
							itemId : 'tabDocumentos',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'RG',
									itemId : "edtNrRg",
									width: 100,
									name: 'NR_RG'
								},
								{
									x:118,y:8,
									xtype : "textfield",
									fieldLabel: 'Órgão Exp.',
									itemId : "edtDsOrgaoExpedidorRg",
									width: 70,
									name: 'DS_ORGAO_EXPEDIDOR_RG',
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
									xtype : "textfield",
									itemId : "edtCdUfRg",
									name: 'CD_UF_RG',
									hidden: true
								},	
								{
									x:198,y:8,
									fieldLabel: 'UF Exp.',
									itemId : "cboCdUfRg",
									width: 60,
									xtype : "combobox",
									store : [
												['AC','AC'],
												['AL','AL'],
												['AM','AM'],
												['AP','AP'],
												['BA','BA'],
												['CE','CE'],
												['DF','DF'],
												['ES','ES'],
												['GO','GO'],
												['MA','MA'],
												['MG','MG'],
												['MS','MS'],
												['MT','MT'],
												['PA','PA'],
												['PB','PB'],
												['PE','PE'],
												['PI','PI'],
												['PR','PR'],
												['RJ','RJ'],
												['RN','RN'],
												['RO','RO'],
												['RR','RR'],
												['RS','RS'],
												['SC','SC'],
												['SE','SE'],
												['SP','SP'],
												['TO','TO']
											],
									forceSelection: true
								},
								{
									x:268,y:8,
									fieldLabel: 'Expedição',
									xtype : "datefield",
									itemId : "edtDtExpedicaoRg",
									format: 'd/m/Y',
									submitFormat: 'Y-m-d',
									width: 130,
									name: 'DT_EXPEDICAO_RG'
								},
								{
									x:408,y:8,
									fieldLabel: 'CPF',
									xtype : "textfield",
									itemId : "edtNrCpf",
									width: 140,
									vtype: 'cpf',
									plugins: "textmask",
									mask: "999.999.999-99",
									name: 'NR_CPF'
								},
								{
									x:8,y:56,
									xtype : "textfield",
									fieldLabel: 'Nº Título Eleitor',
									itemId : "edtNrTituloEleitor",
									width: 170,
									name: 'NR_TITULO_ELEITORAL'
								},
								{
									x:188,y:56,
									xtype : "textfield",
									fieldLabel: 'Zona',
									itemId : "edtNrZonaTituloEleitoral",
									width: 70,
									name: 'NR_ZONA_TITULO_ELEITORAL'
								},
								{
									x:268,y:56,
									xtype : "textfield",
									fieldLabel: 'Seção',
									itemId : "edtNrSecaoTituloEleitoral",
									width: 70,
									name: 'NR_SECAO_TITULO_ELEITORAL'
								},
								{
									xtype : "textfield",
									itemId : "edtCdUfTituloEleitoral",
									name: 'CD_UF_TITULO_ELEITORAL',
									hidden: true
								},	
								{
									x:348,y:56,
									fieldLabel: 'UF',
									itemId : "cboCdUfTituloEleitoral",
									width: 60,
									xtype : "combobox",
									store : [
												['AC','AC'],
												['AL','AL'],
												['AM','AM'],
												['AP','AP'],
												['BA','BA'],
												['CE','CE'],
												['DF','DF'],
												['ES','ES'],
												['GO','GO'],
												['MA','MA'],
												['MG','MG'],
												['MS','MS'],
												['MT','MT'],
												['PA','PA'],
												['PB','PB'],
												['PE','PE'],
												['PI','PI'],
												['PR','PR'],
												['RJ','RJ'],
												['RN','RN'],
												['RO','RO'],
												['RR','RR'],
												['RS','RS'],
												['SC','SC'],
												['SE','SE'],
												['SP','SP'],
												['TO','TO']
											],
									forceSelection: true
								},
								{
									x:418,y:56,
									fieldLabel: 'PIS',
									xtype : "textfield",
									itemId : "edtNrPisPasep",
									width: 130,
									//vtype: 'pis',
									plugins: "textmask",
									mask: "999.99999.99-9",
									name: 'NR_PIS_PASEP'
								},
								{
									x:8,y:104,
									xtype : "textfield",
									fieldLabel: 'Nº Reservista',
									itemId : "edtNrReservista",
									width: 170,
									name: 'NR_RESERVISTA'
								},
								{
									x:188,y:104,
									xtype : "textfield",
									fieldLabel: 'Série',
									itemId : "edtNrSerieReservista",
									width: 70,
									name: 'NR_SERIE_RESERVISTA'
								},
								{
									x:268,y:104,
									xtype : "textfield",
									fieldLabel: 'Tipo',
									itemId : "edtNrTipoReservista",
									width: 70,
									name: 'NR_TIPO_RESERVISTA'
								},
								{
									x:348,y:104,
									xtype : "textfield",
									fieldLabel: 'RM',
									itemId : "edtNrRmReservista",
									width: 90,
									name: 'NR_RM_RESERVISTA'
								},
								{
									x:448,y:104,
									fieldLabel: 'Categoria',
									xtype : "textfield",
									itemId : "edtNrCategoria",
									width: 100,
									name: 'NR_CATEGORIA_RESERVISTA'
								},
								{
									x:8,y:152,
									xtype : "textfield",
									fieldLabel: 'Nº CNH',
									itemId : "edtNrCnh",
									width: 130,
									name: 'NR_CNH'
								},
								{
									xtype : "textfield",
									itemId : "edtCdUfCnh",
									name: 'CD_UF_CNH',
									hidden: true
								},	
								{
									x:148,y:152,
									fieldLabel: 'UF',
									itemId : "cboCdUfCnh",
									width: 60,
									xtype : "combobox",
									store : [
												['AC','AC'],
												['AL','AL'],
												['AM','AM'],
												['AP','AP'],
												['BA','BA'],
												['CE','CE'],
												['DF','DF'],
												['ES','ES'],
												['GO','GO'],
												['MA','MA'],
												['MG','MG'],
												['MS','MS'],
												['MT','MT'],
												['PA','PA'],
												['PB','PB'],
												['PE','PE'],
												['PI','PI'],
												['PR','PR'],
												['RJ','RJ'],
												['RN','RN'],
												['RO','RO'],
												['RR','RR'],
												['RS','RS'],
												['SC','SC'],
												['SE','SE'],
												['SP','SP'],
												['TO','TO']
											],
									forceSelection: true
								},
								{
									x:218,y:152,
									fieldLabel: 'Validade',
									xtype : "datefield",
									itemId : "edtDtValidadeCnh",
									format: 'd/m/Y',
									submitFormat: 'Y-m-d',
									width: 130,
									name: 'DT_VALIDADE_CNH'
								},
								{
									x:358,y:152,
									xtype : "textfield",
									fieldLabel: 'Categoria',
									itemId : "edtTpCategoriaCnh",
									width: 50,
									name: 'TP_CATEGORIA_CNH',
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
									x:418,y:152,
									fieldLabel: 'Nº Registro',
									xtype : "textfield",
									itemId : "edtNrRegistroCnh",
									width: 130,
									name: 'NR_REGISTRO_CNH'
								}
							]
						},
						/* Endereço */
						{
							title: 'Endereço',
							layout: 'absolute',
							itemId : 'tabEndereco',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdEndereco",
									name: 'CD_ENDERECO',
									hidden: true
								},
								{
									xtype : "numberfield",
									itemId : "edtCdTipoLogradouro",
									name: 'CD_TIPO_LOGRADOURO',
									hidden: true
								},
								{
									x:8,y:8,
									fieldLabel: 'Tipo de Logradouro',
									itemId : "cboCdTipoLogradouro",
									width: 170,
									//allowBlank: false,
									xtype : "combobox",
									store: 'Generico.TipoLogradouroStore',
									displayField: 'DS_TIPO_LOGRADOURO',
									valueField: 'CD_TIPO_LOGRADOURO',
									queryDelay: 250,
									//pageSize: 30,
									queryParam: 'dsTipoLogradouro',
									forceSelection: true,
									minChars: 3,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								},
								{
									x:188,y:8,
									xtype : "textfield",
									fieldLabel: 'Logradouro',
									itemId : "edtDsLogradouro",
									width: 360,
									name: 'DS_LOGRADOURO'
								},
								{
									x:8,y:56,
									xtype : "numberfield",
									fieldLabel: 'Número',
									itemId : "edtNrEndereco",
									width: 60,
									name: 'NR_ENDERECO'
								},
								{
									x:78,y:56,
									xtype : "textfield",
									fieldLabel: 'Complemento',
									itemId : "edtDsComplemento",
									width: 160,
									name: 'DS_COMPLEMENTO'
								},
								{
									x:248,y:56,
									xtype : "textfield",
									fieldLabel: 'Bairro',
									itemId : "edtNmbairro",
									width: 300,
									name: 'NM_BAIRRO'
								},
								{
									xtype : "numberfield",
									itemId : "edtCdCidade",
									name: 'CD_CIDADE',
									hidden: true
								},
								{
									x:8,y:104,
									fieldLabel: 'UF/Cidade',
									itemId : "cboCdCidade",
									width: 228,
									//allowBlank: false,
									xtype : "combobox",
									store: 'Generico.CidadeStore',
									displayField: 'DS_CIDADE',
									valueField: 'CD_CIDADE',
									queryDelay: 250,
									//pageSize: 30,
									queryParam: 'dsCidade',
									forceSelection: true,
									minChars: 3,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								},
								{
									xtype : "numberfield",
									itemId : "edtCdTipoEndereco",
									name: 'CD_TIPO_ENDERECO',
									hidden: true
								},
								{
									x:248,y:104,
									fieldLabel: 'Tipo de endereço',
									itemId : "cboCdTipoEndereco",
									width: 140,
									//allowBlank: false,
									xtype : "combobox",
									store: 'Generico.TipoEnderecoStore',
									displayField: 'DS_TIPO_ENDERECO',
									valueField: 'CD_TIPO_ENDERECO',
									queryDelay: 250,
									//pageSize: 30,
									queryParam: 'dsTipoEndereco',
									forceSelection: true,
									minChars: 3,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								},
								{
									x:400,y:104,
									fieldLabel: 'CEP',
									xtype : "textfield",
									itemId : "edtNrCep",
									width: 70,
									plugins: "textmask",
									mask: "99.999-999",
									name: 'NR_CEP'
								},
								{
									x:479,y:121,
									xtype : "button",
									itemId: 'btnNovoItEnderecoPessoa',
									tooltip: '<b>Incluir um novo endereço na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:502,y:121,
									xtype : "button",
									itemId: 'btnSalvarItEnderecoPessoa',
									tooltip: '<b>Salvar endereço na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:525,y:121,
									xtype : "button",
									itemId: 'btnExcluirItEnderecoPessoa',
									tooltip: '<b>Excluir endereço da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:156,
									xtype : "telaCadastroPessoaEdit_gridItEnderecoPessoa",
									itemId: 'gridItEnderecoPessoa',
									width: 545,
									height: 140,
									border : true
								}
							]
						},
						{
							title: 'Informações Religiosas',
							layout: 'absolute',
							itemId : 'tabReligiao',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdReligiao",
									name: 'CD_RELIGIAO',
									hidden: true
								},
								{
									x:8,y:8,
									fieldLabel: 'Religião',
									itemId : "cboCdReligiao",
									width: 540,
									xtype : "combobox",
									store: 'Generico.ReligiaoStore',
									displayField: 'DS_RELIGIAO',
									valueField: 'CD_RELIGIAO',
									//pageSize: 30,
									queryParam: 'dsReligiao',
									//allowBlank: false,
									forceSelection: true,
									minChars: 1,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								}
							]
						},
						
						
						
						
						
						
						
						
						/* Redes Sociais */
						{
							title: 'Redes Sociais',
							layout: 'absolute',
							itemId : 'tabRedesSociais',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdRedeSocialPessoa",
									name: 'CD_REDE_SOCIAL_PESSOA',
									hidden: true
								},
								{
									xtype : "numberfield",
									itemId : "edtCdRedeSocial",
									name: 'CD_REDE_SOCIAL',
									hidden: true
								},
								{
									x:8,y:8,
									fieldLabel: 'Rede Social',
									itemId : "cboCdRedeSocial",
									width: 540,
									//allowBlank: false,
									xtype : "combobox",
									store: 'Generico.RedeSocialStore',
									displayField: 'DS_REDE_SOCIAL',
									valueField: 'CD_REDE_SOCIAL',
									queryDelay: 250,
									//pageSize: 30,
									queryParam: 'dsRedeSocial',
									forceSelection: true,
									minChars: 3,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								},
								{
									x:8,y:56,
									xtype : "textfield",
									fieldLabel: 'Endereço da Rede Social',
									itemId : "edtDsRedeSocialPessoa",
									width: 459,
									name: 'DS_REDE_SOCIAL_PESSOA'
								},
								{
									x:479,y:73,
									xtype : "button",
									itemId: 'btnNovoItRedeSocialPessoa',
									tooltip: '<b>Incluir uma nova rede social na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:502,y:73,
									xtype : "button",
									itemId: 'btnSalvarItRedeSocialPessoa',
									tooltip: '<b>Salvar uma rede social na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:525,y:73,
									xtype : "button",
									itemId: 'btnExcluirItRedeSocialPessoa',
									tooltip: '<b>Excluir uma rede social da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:110,
									xtype : "telaCadastroPessoaEdit_gridItRedeSocialPessoa",
									itemId: 'gridItRedeSocialPessoa',
									width: 545,
									height: 180,
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