Ext.define('erp.view.Cadastro.CadastroCliente.TelaCadastroClienteEdit', {
    extend: 'Ext.Window',
    alias: 'widget.telaCadastroClienteEdit',
	layout: 'fit',
    width: 590,  
    height: 530, 
    resizable: false,
	modal: true,
	title: 'Cliente',
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
					itemId : "edtCdPessoaPj",
					name: 'CD_PESSOA_PJ',
					hidden: true
				},
				{
					x:8,y:8,
					xtype : "textfield",
					fieldLabel: 'Razão Social',
					itemId : "edtNmRazaoSocial",
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
					name: 'NM_RAZAO_SOCIAL'
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
				{
					xtype : "numberfield",
					itemId : "edtCdClassificacao",
					name: 'CD_CLASSIFICACAO',
					hidden: true
				},
				{
					x:8,y:56,
					fieldLabel: 'Classificação',
					itemId : "cboCdClassificacao",
					width: 265,
					xtype : "combobox",
					store: 'Generico.ClassificacaoStore',
					displayField: 'DS_CLASSIFICACAO',
					valueField: 'CD_CLASSIFICACAO',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'dsClassificacao',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}
				},
				{
					xtype : "numberfield",
					itemId : "edtCdStatusCliente",
					name: 'CD_STATUS_CLIENTE',
					hidden: true
				},
				{
					x:283,y:56,
					fieldLabel: 'Status do Cliente',
					itemId : "cboCdStatusCliente",
					width: 285,
					xtype : "combobox",
					store: 'Generico.StatusClienteStore',
					displayField: 'DS_STATUS_CLIENTE',
					valueField: 'CD_STATUS_CLIENTE',
					queryDelay: 250,
					//pageSize: 30,
					queryParam: 'dsStatusCliente',
					forceSelection: true,
					minChars: 3,
					trigger2Cls: 'x-form-clear-trigger',
					onTrigger2Click : function(e) {
						this.clearValue();
					}
				},
				// Inicio do TAB
                {
					x:8,y:107,
					xtype: 'tabpanel',
					activeTab: 0,
					itemId :'pnlItensCliente',
					width: 560,
					height: 340,
					items : [
						/* Informação cadastral */
						{
							title: 'Informações Cadastrais',
							layout: 'absolute',
							itemId : 'tabInfoCadastral',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Nome de Fantasia',
									itemId : "edtNmFantasia",
									width: 430,
									name: 'NM_FANTASIA'
								},
								{
									x:448,y:8,
									fieldLabel: 'Fundação',
									xtype : "datefield",
									itemId : "edtDtFundacao",
									format: 'd/m/Y',
									submitFormat: 'Y-m-d',
									width: 100,
									//hidden: true,
									name: 'DT_FUNDACAO'
								},
								{
									x:8,y:56,
									fieldLabel: 'CNPJ',
									xtype : "textfield",
									itemId : "edtNrCnpj",
									width: 120,
									vtype: 'cnpj',
									plugins: "textmask",
									mask: "99.999.999/9999-99",
									name: 'NR_CNPJ'
								},
								{
									x:138,y:56,
									fieldLabel: 'CPF',
									xtype : "textfield",
									itemId : "edtNrCpf",
									width: 100,
									vtype: 'cpf',
									plugins: "textmask",
									mask: "999.999.999-99",
									name: 'NR_CPF'
								},
								{
									x:248,y:56,
									xtype : "textfield",
									fieldLabel: 'Insc. Estadual',
									itemId : "edtNrIe",
									width: 140,
									name: 'NR_IE'
								},
								{
									x:398,y:56,
									xtype : "textfield",
									fieldLabel: 'Insc. Municipal',
									itemId : "edtNrIm",
									width: 150,
									name: 'NR_IM'
								},
								{
									x:8,y:104,
									fieldLabel: 'Telefone',
									xtype : "textfield",
									itemId : "edtNrTelefone1",
									width: 100,
									plugins: "textmask",
									mask: "(99) 9999-9999",
									name: 'NR_TELEFONE_1'
								},
								{
									x:118,y:104,
									fieldLabel: 'Telefone',
									xtype : "textfield",
									itemId : "edtNrTelefone2",
									width: 100,
									plugins: "textmask",
									mask: "(99) 9999-9999",
									name: 'NR_TELEFONE_2'
								},
								{
									x:228,y:104,
									fieldLabel: 'Telefone',
									xtype : "textfield",
									itemId : "edtNrTelefone3",
									width: 100,
									plugins: "textmask",
									mask: "(99) 9999-9999",
									name: 'NR_TELEFONE_3'
								},
								{
									x:338,y:104,
									fieldLabel: 'Telefone',
									xtype : "textfield",
									itemId : "edtNrTelefone4",
									width: 100,
									plugins: "textmask",
									mask: "(99) 9999-9999",
									name: 'NR_TELEFONE_4'
								},
								{
									x:448,y:104,
									fieldLabel: 'Celular',
									xtype : "textfield",
									itemId : "edtNrCelular",
									width: 100,
									plugins: "textmask",
									mask: "(99) 9 9999-9999",
									name: 'NR_CELULAR'
								},
								{
									x:8,y:152,
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
								}

							]
						},
						/* Contatos */
						{
							title: 'Contatos',
							layout: 'absolute',
							itemId : 'tabContatos',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdContato",
									name: 'CD_CONTATO',
									hidden: true
								},
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Nome do contato',
									itemId : "edtNmContato",
									width: 540,
									name: 'NM_CONTATO'
								},
								{
									x:8,y:56,
									xtype : "textfield",
									fieldLabel: 'E-mail',
									itemId : "edtDsEmailContato",
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
									fieldLabel: 'Telefone',
									xtype : "textfield",
									itemId : "edtNrTelefone1Contato",
									width: 100,
									plugins: "textmask",
									mask: "(99) 9999-9999",
									name: 'NR_TELEFONE_1'
								},
								{
									x:118,y:104,
									fieldLabel: 'Telefone',
									xtype : "textfield",
									itemId : "edtNrTelefone2Contato",
									width: 100,
									plugins: "textmask",
									mask: "(99) 9999-9999",
									name: 'NR_TELEFONE_2'
								},
								{
									xtype : "numberfield",
									itemId : "edtCdTipoContato",
									name: 'CD_TIPO_CONTATO',
									hidden: true
								},
								{
									x:228,y:104,
									fieldLabel: 'Tipo do Contato',
									itemId : "cboCdTipoContato",
									width: 320,
									xtype : "combobox",
									store: 'Generico.TipoContatoStore',
									displayField: 'DS_TIPO_CONTATO',
									valueField: 'CD_TIPO_CONTATO',
									queryDelay: 250,
									//pageSize: 30,
									queryParam: 'dsTipoContato',
									forceSelection: true,
									minChars: 3,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								},
								{
									xtype : "numberfield",
									itemId : "edtCdCargo",
									name: 'CD_CARGO',
									hidden: true
								},
								{
									x:8,y:152,
									fieldLabel: 'Cargo',
									itemId : "cboCdCargo",
									width: 250,
									xtype : "combobox",
									store: 'Generico.CargoStore',
									displayField: 'DS_CARGO',
									valueField: 'CD_CARGO',
									queryDelay: 250,
									//pageSize: 30,
									queryParam: 'dsCargo',
									forceSelection: true,
									minChars: 3,
									trigger2Cls: 'x-form-clear-trigger',
									onTrigger2Click : function(e) {
										this.clearValue();
									}
								},
								{
									x:268,y:152,
									xtype : "textfield",
									fieldLabel: 'Elo com o Cliente',
									itemId : "edtDsElo",
									width: 200,
									name: 'DS_ELO'
								},
								{
									x:479,y:168,
									xtype : "button",
									itemId: 'btnNovoContatoCliente',
									tooltip: '<b>Incluir um novo contato na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:502,y:168,
									xtype : "button",
									itemId: 'btnSalvarContatoCliente',
									tooltip: '<b>Salvar contato na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:525,y:168,
									xtype : "button",
									itemId: 'btnExcluirContatoCliente',
									tooltip: '<b>Excluir contato da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:206,
									xtype : "telaCadastroClienteEdit_gridItContatoCliente",
									itemId: 'gridItContatoCliente',
									width: 545,
									height: 100,
									border : true
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
									fieldLabel: 'Tipo de Endereço',
									itemId : "cboCdTipoEndereco",
									width: 140,
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
									itemId: 'btnNovoItEnderecoCliente',
									tooltip: '<b>Incluir um novo endereço na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:502,y:121,
									xtype : "button",
									itemId: 'btnSalvarItEnderecoCliente',
									tooltip: '<b>Salvar endereço na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:525,y:121,
									xtype : "button",
									itemId: 'btnExcluirItEnderecoCliente',
									tooltip: '<b>Excluir endereço da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:156,
									xtype : "telaCadastroClienteEdit_gridItEnderecoCliente",
									itemId: 'gridItEnderecoCliente',
									width: 545,
									height: 150,
									border : true
								}
							]
						},
						/* Visitas */
						{
							title: 'Visitas',
							layout: 'absolute',
							itemId : 'tabVisitas',
							defaults: {
								labelAlign: 'top',
								labelSeparator: ''
							},
							items : [
								{
									xtype : "numberfield",
									itemId : "edtCdVisita",
									name: 'CD_VISITA',
									hidden: true
								},
								{
									x:8,y:8,
									xtype : "textfield",
									fieldLabel: 'Pessoa que Realizou a Visita',
									itemId : "edtNmVisitante",
									width: 350,
									name: 'NM_VISITANTE'
								},
								{
									x:368,y:8,
									fieldLabel: 'Data da Visita',
									xtype : "datefield",
									itemId : "edtDtVisita",
									format: 'd/m/Y',
									submitFormat: 'Y-m-d',
									width: 100,
									name: 'DT_VISITA'
								},
								{
									x:479,y:25,
									xtype : "button",
									itemId: 'btnNovaVisitaCliente',
									tooltip: '<b>Incluir um novo registro de visita na lista</b>',
									iconCls: 'new_16'
								},
								{
									x:502,y:25,
									xtype : "button",
									itemId: 'btnSalvarVisitaCliente',
									tooltip: '<b>Salvar a visita na lista</b>',
									iconCls: 'tick_16'
								},
								{
									x:525,y:25,
									xtype : "button",
									itemId: 'btnExcluirVisitaCliente',
									tooltip: '<b>Excluir a visita da lista</b>',
									iconCls: 'delete_16'
								},
								{
									x:8,y:56,
									xtype : "telaCadastroClienteEdit_gridItVisitaCliente",
									itemId: 'gridItVisitaCliente',
									width: 545,
									height: 250,
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