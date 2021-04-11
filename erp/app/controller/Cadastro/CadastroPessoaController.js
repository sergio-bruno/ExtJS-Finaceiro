Ext.define('erp.controller.Cadastro.CadastroPessoaController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroPessoa.PessoaStore',
		'Cadastro.CadastroPessoa.EnderecoPessoaStore',
		'Cadastro.CadastroPessoa.EnderecoPessoaDbStore',

		'Cadastro.CadastroPessoa.RedeSocialPessoaStore',
		'Cadastro.CadastroPessoa.RedeSocialPessoaDbStore',

		'Generico.EstadoCivilStore',
		'Generico.EscolaridadeStore',
		'Generico.ReligiaoStore',
		'Generico.RedeSocialStore',
		'Generico.CidadeStore',
		'Generico.TipoLogradouroStore',
		'Generico.TipoEnderecoStore'
    ],
	views: [
		'Cadastro.CadastroPessoa.TelaCadastroPessoa',
		'Cadastro.CadastroPessoa.TelaCadastroPessoaEdit',
		'Cadastro.CadastroPessoa.GridPessoa',
		'Cadastro.CadastroPessoa.GridItEnderecoPessoa',
		'Cadastro.CadastroPessoa.GridItRedeSocialPessoa'
    ],
    refs: [
        {
            ref: 'telaCadastroPessoa',
            selector: 'telaCadastroPessoa'
        },
        {
            ref: 'telaCadastroPessoaEdit',
            selector: 'telaCadastroPessoaEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroPessoa': {
				afterrender: this.telaCadastroPessoa_afterrender,
				beforedestroy: this.telaCadastroPessoa_beforedestroy
            },
			'telaCadastroPessoa #btnNovoPessoa': {
				click: this.telaCadastroPessoa_btnNovoPessoa_click
			},
			'telaCadastroPessoa #btnEditarPessoa': {
				click: this.telaCadastroPessoa_btnEditarPessoa_click
			},	
			'telaCadastroPessoa #gridPessoa': {
				itemdblclick: this.telaCadastroPessoa_gridPessoa_itemdblclick
			},
			'telaCadastroPessoa #btnExcluirPessoa': {
				click: this.telaCadastroPessoa_btnExcluirPessoa_click
			},
			'telaCadastroPessoa #btnAtualizarLista': {
				click: this.telaCadastroPessoa_btnAtualizarLista_click
			},
			'telaCadastroPessoa #btnFiltroPesquisa': {
				click: this.telaCadastroPessoa_btnFiltroPesquisa_click
			},	
			'telaCadastroPessoaEdit #btnSalvar': {
				click: this.telaCadastroPessoaEdit_btnSalvar_click
			},
			'telaCadastroPessoa #btnPesquisarPesquisa': {
				click: this.CadastroPessoa_btnPesquisarPesquisa_click
			},
			'telaCadastroPessoa #btnLimparPesquisa': {
				click: this.CadastroPessoa_btnLimparPesquisa_click
			},
			// Ações de edição
			// cboCdUfRg, cboCdUfTituloEleitoral, cboCdUfCnh, cboTpSexo
			// cboTpSanguineo, cboCdUfNaturalidade, cboCdEscolaridade,
			// cboCdEstadoCivil, cboCdReligiao, cboCdRedeSocial
            'telaCadastroPessoaEdit': {
				beforedestroy: this.telaCadastroPessoaEdit_beforedestroy
            },
			'telaCadastroPessoaEdit #cboCdUfRg': {
				change: this.telaCadastroPessoaEdit_cboCdUfRg_change
			},
			'telaCadastroPessoaEdit #cboCdUfTituloEleitoral': {
				change: this.telaCadastroPessoaEdit_cboCdUfTituloEleitoral_change
			},
			'telaCadastroPessoaEdit #cboCdUfCnh': {
				change: this.telaCadastroPessoaEdit_cboCdUfCnh_change
			},
			'telaCadastroPessoaEdit #cboTpSexo': {
				change: this.telaCadastroPessoaEdit_cboTpSexo_change
			},
			'telaCadastroPessoaEdit #cboTpSanguineo': {
				change: this.telaCadastroPessoaEdit_cboTpSanguineo_change
			},
			'telaCadastroPessoaEdit #cboCdUfNaturalidade': {
				change: this.telaCadastroPessoaEdit_cboCdUfNaturalidade_change
			},
			'telaCadastroPessoaEdit #cboCdEscolaridade': {
				change: this.telaCadastroPessoaEdit_cboCdEscolaridade_change
			},
			'telaCadastroPessoaEdit #cboCdEstadoCivil': {
				change: this.telaCadastroPessoaEdit_cboCdEstadoCivil_change
			},
			'telaCadastroPessoaEdit #cboCdReligiao': {
				change: this.telaCadastroPessoaEdit_cboCdReligiao_change
			},
			// Cadastro de endereços
			'telaCadastroPessoaEdit #cboCdTipoEndereco': {
				change: this.telaCadastroPessoaEdit_cboCdTipoEndereco_change
			},
			'telaCadastroPessoaEdit #cboCdTipoLogradouro': {
				change: this.telaCadastroPessoaEdit_cboCdTipoLogradouro_change
			},
			'telaCadastroPessoaEdit #cboCdCidade': {
				change: this.telaCadastroPessoaEdit_cboCdCidade_change
			},
			'telaCadastroPessoaEdit #btnNovoItEnderecoPessoa': {
				click: this.telaCadastroPessoaEdit_btnNovoItEnderecoPessoa_click
			},
			'telaCadastroPessoaEdit #btnSalvarItEnderecoPessoa': {
				click: this.telaCadastroPessoaEdit_btnSalvarItEnderecoPessoa_click
			},
			'telaCadastroPessoaEdit #btnExcluirItEnderecoPessoa': {
				click: this.telaCadastroPessoaEdit_btnExcluirItEnderecoPessoa_click
			},
			'telaCadastroPessoaEdit #gridItEnderecoPessoa': {
				itemdblclick: this.telaCadastroPessoaEdit_gridItEnderecoPessoa_itemdblclick
			},
			// Cadastro de redes sociais
			'telaCadastroPessoaEdit #cboCdRedeSocial': {
				change: this.telaCadastroPessoaEdit_cboCdRedeSocial_change
			},
			'telaCadastroPessoaEdit #btnNovoItRedeSocialPessoa': {
				click: this.telaCadastroPessoaEdit_btnNovoItRedeSocialPessoa_click
			},
			'telaCadastroPessoaEdit #btnSalvarItRedeSocialPessoa': {
				click: this.telaCadastroPessoaEdit_btnSalvarItRedeSocialPessoa_click
			},
			'telaCadastroPessoaEdit #btnExcluirItRedeSocialPessoa': {
				click: this.telaCadastroPessoaEdit_btnExcluirItRedeSocialPessoa_click
			},
			'telaCadastroPessoaEdit #gridItRedeSocialPessoa': {
				itemdblclick: this.telaCadastroPessoaEdit_gridItRedeSocialPessoa_itemdblclick
			}
        })   
    },
	
	
	/* início cadastro redes sociais */	
	telaCadastroPessoaEdit_cboCdRedeSocial_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocial').setValue(newValue);
	},
	telaCadastroPessoaEdit_btnNovoItRedeSocialPessoa_click: function(button) {
		this.limpaDadosRedeSocial();
	},
	limpaDadosRedeSocial: function() {
		var controller = this;
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocialPessoa').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocial').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('cboCdRedeSocial').clearValue();
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtDsRedeSocialPessoa').setValue(null);
	},
	telaCadastroPessoaEdit_btnSalvarItRedeSocialPessoa_click: function(button) {
		var controller = this;

		if (controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('cboCdRedeSocial').getRawValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o tipo de rede social...', 'W', 8000);	
		} else if (controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtDsRedeSocialPessoa').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o endereço da rede social...', 'W', 8000);	
		} else {
			var cdRedeSocialPessoa = controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocialPessoa').getValue();
			var store = controller.getCadastroCadastroPessoaRedeSocialPessoaStoreStore();

			// Para alterar um endereço
			if ( cdRedeSocialPessoa != "" && cdRedeSocialPessoa != null ) {
				// percorer a lista e alterar o endereço selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_REDE_SOCIAL_PESSOA') == cdRedeSocialPessoa ) {
							rec.set('CD_PESSOA',controller.getTelaCadastroPessoaEdit().down('form').getComponent('edtCdPessoa').getValue());
							rec.set('DS_REDE_SOCIAL_PESSOA',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtDsRedeSocialPessoa').getValue());
							rec.set('CD_REDE_SOCIAL',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocial').getValue());
							rec.set('DS_REDE_SOCIAL',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('cboCdRedeSocial').getRawValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Cadastro.CadastroPessoa.RedeSocialPessoaModel');
				record.set('CD_PESSOA',controller.getTelaCadastroPessoaEdit().down('form').getComponent('edtCdPessoa').getValue());
				record.set('CD_REDE_SOCIAL_PESSOA',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocialPessoa').getValue());
				record.set('DS_REDE_SOCIAL_PESSOA',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtDsRedeSocialPessoa').getValue());
				record.set('CD_REDE_SOCIAL',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocial').getValue());
				record.set('DS_REDE_SOCIAL',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('cboCdRedeSocial').getRawValue());
				
				store.add(record);
			}
			controller.limpaDadosRedeSocial();
		}
	},
	telaCadastroPessoaEdit_btnExcluirItRedeSocialPessoa_click: function(button) {
		var store = this.getCadastroCadastroPessoaRedeSocialPessoaStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhuma rede social foi inserida na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('gridItRedeSocialPessoa').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir esta rede social?",
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
				Ext.msgbox.msg('Aviso', 'Selecione primeiro uma rede social na lista...', 'W', 8000);		
			}
		}
	},
	telaCadastroPessoaEdit_gridItRedeSocialPessoa_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocialPessoa').setValue(record.get('CD_REDE_SOCIAL_PESSOA'));

			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtDsRedeSocialPessoa').setValue(record.get('DS_REDE_SOCIAL_PESSOA'));	
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('edtCdRedeSocial').setValue(record.get('CD_REDE_SOCIAL'));
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('cboCdRedeSocial').setValue(record.get('CD_REDE_SOCIAL'));
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabRedesSociais').getComponent('cboCdRedeSocial').setRawValue(record.get('DS_REDE_SOCIAL'));
		}
	},
	/* final cadastro redes sociais */	
	
	telaCadastroPessoaEdit_gridItEnderecoPessoa_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdEndereco').setValue(record.get('CD_ENDERECO'));

			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(record.get('CD_TIPO_LOGRADOURO'));
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').setValue(record.get('CD_TIPO_LOGRADOURO'));
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').setRawValue(record.get('DS_TIPO_LOGRADOURO'));
			
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsLogradouro').setValue(record.get('DS_LOGRADOURO'));
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrEndereco').setValue(record.get('NR_ENDERECO'));
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsComplemento').setValue(record.get('DS_COMPLEMENTO'));
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNmbairro').setValue(record.get('NM_BAIRRO'));

			/* Cidade */
			if ( record.get('CD_CIDADE') != "" && record.get('CD_CIDADE') != null ) {
				/*
				var storeCidade = controller.getGenericoCidadeStoreStore();
				storeCidade.load({params:{cdCidade: record.get('CD_CIDADE')}});
				storeCidade.on('load',  function handleLoad(st,records) {
					if (storeCidade.getCount() > 0) {
						controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(record.get('CD_CIDADE'));
						controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').setValue(record.get('CD_CIDADE'));
						controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').setRawValue(record.get('CD_UF')+ " - " +record.get('DS_CIDADE') );
					}
					storeCidade.un('load',handleLoad);
					win.setLoading(false);
				});
				*/
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(record.get('CD_CIDADE'));
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').setValue(record.get('CD_CIDADE'));
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').setRawValue(record.get('CD_UF')+ " - " +record.get('DS_CIDADE') );
			} else {
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(null);
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').setValue(null);
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').setRawValue(null);
			}

			/* Tipo endereço */
			if ( record.get('CD_TIPO_ENDERECO') != "" && record.get('CD_TIPO_ENDERECO') != null ) {
				/*
				var storeTipoEndereco = controller.getGenericoTipoEnderecoStoreStore();
				storeTipoEndereco.load({params:{cdTipoEndereco: record.get('CD_TIPO_ENDERECO')}});
				storeTipoEndereco.on('load',  function handleLoad(st,records) {
					if (storeTipoEndereco.getCount() > 0) {
						controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
						controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
						controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setRawValue(record.get('DS_TIPO_ENDERECO'));
					}
					storeTipoEndereco.un('load',handleLoad);
					win.setLoading(false);
				});
				*/
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setRawValue(record.get('DS_TIPO_ENDERECO'));
			} else {
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(null);
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setValue(null);
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setRawValue(null);
			}
			
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrCep').setValue(record.get('NR_CEP'));
		}
	},
	
	telaCadastroPessoaEdit_btnExcluirItEnderecoPessoa_click: function(button) {
		var store = this.getCadastroCadastroPessoaEnderecoPessoaStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum endereço foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('gridItEnderecoPessoa').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir este endereço?",
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
				Ext.msgbox.msg('Aviso', 'Selecione primeiro um endereço na lista...', 'W', 8000);		
			}
		}
	},

	telaCadastroPessoaEdit_cboCdTipoEndereco_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(newValue);
	},
	
	telaCadastroPessoaEdit_cboCdTipoLogradouro_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(newValue);
	},
	
	telaCadastroPessoaEdit_cboCdCidade_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(newValue);
	},
	
	telaCadastroPessoaEdit_btnNovoItEnderecoPessoa_click: function(button) {
		this.limpaDadosEndereco();
	},
	
	telaCadastroPessoaEdit_btnSalvarItEnderecoPessoa_click: function(button) {
		var controller = this;

		if (controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o tipo de logradouro...', 'W', 8000);	
		} else if (controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o logradouro...', 'W', 8000);	
		} else if (controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNmbairro').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o bairro...', 'W', 8000);	
		} else if (controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').getRawValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o município...', 'W', 8000);	
		} else {
			var cdEndereco = controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdEndereco').getValue();
			var ufCidade = controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').getRawValue();
			var store = controller.getCadastroCadastroPessoaEnderecoPessoaStoreStore();

			// Para alterar um endereço
			if ( cdEndereco != "" && cdEndereco != null ) {
				// percorer a lista e alterar o endereço selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_ENDERECO') == cdEndereco ) {
							rec.set('CD_PESSOA',controller.getTelaCadastroPessoaEdit().down('form').getComponent('edtCdPessoa').getValue());
							rec.set('DS_LOGRADOURO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue());
							rec.set('CD_TIPO_LOGRADOURO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').getValue());
							//rec.set('DS_TIPO_LOGRADOURO_ABREV','');
							rec.set('DS_TIPO_LOGRADOURO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue());
							rec.set('NR_ENDERECO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrEndereco').getValue());
							rec.set('DS_COMPLEMENTO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsComplemento').getValue());
							rec.set('NM_BAIRRO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNmbairro').getValue());			
							rec.set('CD_CIDADE',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdCidade').getValue());			
							//rec.set('CD_IBGE','');
							rec.set('DS_CIDADE', ufCidade.substr(5,200).trim() );			
							rec.set('CD_UF', ufCidade.substr(0,2) );
							rec.set('NR_CEP',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrCep').getValue());			
							rec.set('CD_TIPO_ENDERECO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').getValue());
							rec.set('DS_TIPO_ENDERECO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').getRawValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Cadastro.CadastroPessoa.EnderecoPessoaModel');
				record.set('CD_PESSOA',controller.getTelaCadastroPessoaEdit().down('form').getComponent('edtCdPessoa').getValue());
				record.set('CD_ENDERECO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdEndereco').getValue());
				record.set('DS_LOGRADOURO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue());
				record.set('CD_TIPO_LOGRADOURO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').getValue());
				//record.set('DS_TIPO_LOGRADOURO_ABREV','');
				record.set('DS_TIPO_LOGRADOURO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue());
				record.set('NR_ENDERECO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrEndereco').getValue());
				record.set('DS_COMPLEMENTO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsComplemento').getValue());
				record.set('NM_BAIRRO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNmbairro').getValue());			
				record.set('CD_CIDADE',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdCidade').getValue());			
				//record.set('CD_IBGE','');
				record.set('DS_CIDADE', ufCidade.substr(5,200).trim() );			
				record.set('CD_UF', ufCidade.substr(0,2) );
				record.set('NR_CEP',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrCep').getValue());			
				record.set('CD_TIPO_ENDERECO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').getValue());
				record.set('DS_TIPO_ENDERECO',controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').getRawValue());
				store.add(record);
			}
			controller.limpaDadosEndereco();
		}
	},

	// limpar os dados do endereço da tela
	limpaDadosEndereco: function() {
		var controller = this;
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdEndereco').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').clearValue();
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsLogradouro').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrEndereco').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtDsComplemento').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNmbairro').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdCidade').clearValue();
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtNrCep').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(null);
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').clearValue();
	},

	// aba documentos
	telaCadastroPessoaEdit_cboCdUfRg_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('edtCdUfRg').setValue(newValue);
	},
	telaCadastroPessoaEdit_cboCdUfTituloEleitoral_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('edtCdUfTituloEleitoral').setValue(newValue);
	},
	telaCadastroPessoaEdit_cboCdUfCnh_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('edtCdUfCnh').setValue(newValue);
	},
	// aba outras informações
	telaCadastroPessoaEdit_cboTpSexo_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtTpSexo').setValue(newValue);
	},
	telaCadastroPessoaEdit_cboTpSanguineo_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtTpSanguineo').setValue(newValue);
	},
	telaCadastroPessoaEdit_cboCdUfNaturalidade_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtCdUfNaturalidade').setValue(newValue);
	},
	telaCadastroPessoaEdit_cboCdEscolaridade_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtCdEscolaridade').setValue(newValue);
	},
	telaCadastroPessoaEdit_cboCdEstadoCivil_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtCdEstadoCivil').setValue(newValue);
	},
	// aba informações religiosas
	telaCadastroPessoaEdit_cboCdReligiao_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabReligiao').getComponent('edtCdReligiao').setValue(newValue);
	},
	
	pesquisarPessoa: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroPessoaPessoaStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroPessoaController.php?op=getListaPessoa&nmPessoa='+controller.getTelaCadastroPessoa().getComponent('panPesquisaPessoa').getComponent('edtNmPessoaPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroPessoa().setLoading('Aguarde...');
		
		controller.getTelaCadastroPessoa().getComponent('gridPessoa').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroPessoa().getComponent('gridPessoa') != undefined) {
					controller.getTelaCadastroPessoa().getComponent('gridPessoa').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroPessoaPessoaStoreStore().removeAll();
			}
			controller.getTelaCadastroPessoa().setLoading(false);
		});
	},	
	
	telaCadastroPessoa_afterrender: function(panel) {
		this.pesquisarPessoa();
	},
	
	telaCadastroPessoa_beforedestroy: function(panel) {
		this.getCadastroCadastroPessoaPessoaStoreStore().removeAll();
	},

	telaCadastroPessoaEdit_beforedestroy: function(panel) {
		this.getCadastroCadastroPessoaEnderecoPessoaStoreStore().removeAll();
		this.getCadastroCadastroPessoaEnderecoPessoaDbStoreStore().removeAll();
		
		this.getCadastroCadastroPessoaRedeSocialPessoaStoreStore().removeAll();
		this.getCadastroCadastroPessoaRedeSocialPessoaDbStoreStore().removeAll();
	},

	telaCadastroPessoa_btnNovoPessoa_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroPessoa.TelaCadastroPessoaEdit').show();
		
		this.getTelaCadastroPessoaEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroPessoaEdit().down('form').getComponent('edtNmPessoa').focus(false,300); 
	},

	prepararEdicaoPessoa: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroPessoa.TelaCadastroPessoaEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		win.setLoading('Carregando...');

		// cboCdUfRg, cboCdUfTituloEleitoral, cboCdUfCnh, cboTpSexo
		// cboTpSanguineo, cboCdUfNaturalidade, cboCdEscolaridade,
		// cboCdEstadoCivil, cboCdReligiao

		// aba documentos
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('cboCdUfRg').setValue(record.get('CD_UF_RG'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('cboCdUfRg').setRawValue(record.get('CD_UF_RG'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('edtCdUfRg').setValue(record.get('CD_UF_RG'));
		
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('cboCdUfTituloEleitoral').setValue(record.get('CD_UF_TITULO_ELEITORAL'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('cboCdUfTituloEleitoral').setRawValue(record.get('CD_UF_TITULO_ELEITORAL'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('edtCdUfTituloEleitoral').setValue(record.get('CD_UF_TITULO_ELEITORAL'));
		
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('cboCdUfCnh').setValue(record.get('CD_UF_CNH'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('cboCdUfCnh').setRawValue(record.get('CD_UF_CNH'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabDocumentos').getComponent('edtCdUfCnh').setValue(record.get('CD_UF_CNH'));
		
		// aba outras informações
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboTpSexo').setValue(record.get('TP_SEXO'));
		if ( record.get('TP_SEXO') == 'M' ) {
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboTpSexo').setRawValue('Masculino');
		} else if ( record.get('TP_SEXO') == 'F' ) {
			controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboTpSexo').setRawValue('Feminino');
		} 
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtTpSexo').setValue(record.get('TP_SEXO'));
		
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboTpSanguineo').setValue(record.get('TP_SANGUINEO'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboTpSanguineo').setRawValue(record.get('TP_SANGUINEO'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtTpSanguineo').setValue(record.get('TP_SANGUINEO'));

		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboCdUfNaturalidade').setValue(record.get('CD_UF_NATURALIDADE'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboCdUfNaturalidade').setRawValue(record.get('CD_UF_NATURALIDADE'));
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtCdUfNaturalidade').setValue(record.get('CD_UF_NATURALIDADE'));
	
		if (record.get('CD_ESCOLARIDADE') == null) {
			record.set('CD_ESCOLARIDADE',-1);
		}
		var storeEscolaridade = controller.getGenericoEscolaridadeStoreStore();
		storeEscolaridade.load({params:{cdEscolaridade: record.get('CD_ESCOLARIDADE')}});
		storeEscolaridade.on('load',  function handleLoad(st,records) {
			if (storeEscolaridade.getCount() > 0) {
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboCdEscolaridade').setValue(records[0].get('CD_ESCOLARIDADE'));
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboCdEscolaridade').setRawValue(records[0].get('DS_ESCOLARIDADE'));
				controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtCdEscolaridade').setValue(records[0].get('CD_ESCOLARIDADE'));	
			}
			storeEscolaridade.un('load',handleLoad);

			if (record.get('CD_ESTADO_CIVIL') == null) {
				record.set('CD_ESTADO_CIVIL',-1);
			}
			var storeEstadoCivil = controller.getGenericoEstadoCivilStoreStore();
			storeEstadoCivil.load({params:{cdEstadoCivil: record.get('CD_ESTADO_CIVIL')}});
			storeEstadoCivil.on('load',  function handleLoad(st,records) {
				if (storeEstadoCivil.getCount() > 0) {
					controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboCdEstadoCivil').setValue(records[0].get('CD_ESTADO_CIVIL'));
					controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('cboCdEstadoCivil').setRawValue(records[0].get('DS_ESTADO_CIVIL'));
					controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabOutrasInformacoes').getComponent('edtCdEstadoCivil').setValue(records[0].get('CD_ESTADO_CIVIL'));	
				}
				storeEstadoCivil.un('load',handleLoad);
			});
			
			if (record.get('CD_RELIGIAO') == null) {
				record.set('CD_RELIGIAO',-1);
			}
			var storeReligiao = controller.getGenericoReligiaoStoreStore();
			storeReligiao.load({params:{cdReligiao: record.get('CD_RELIGIAO')}});
			storeReligiao.on('load',  function handleLoad(st,records) {
				if (storeReligiao.getCount() > 0) {
					controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabReligiao').getComponent('cboCdReligiao').setValue(records[0].get('CD_RELIGIAO'));
					controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabReligiao').getComponent('cboCdReligiao').setRawValue(records[0].get('DS_RELIGIAO'));
					controller.getTelaCadastroPessoaEdit().down('form').getComponent('pnlItensPessoa').getComponent('tabReligiao').getComponent('edtCdReligiao').setValue(records[0].get('CD_RELIGIAO'));	
				}
				storeReligiao.un('load',handleLoad);
				win.setLoading(false);
			});
		});
		
		// carregar o grid de endereços
		controller.pesquisarItEnderecoPessoa(record.get('CD_PESSOA'));

		// carregar o grid de redes sociais
		controller.pesquisarItRedeSocialPessoa(record.get('CD_PESSOA'));
	
		controller.getTelaCadastroPessoaEdit().down('form').getComponent('edtNmPessoa').focus(false,300);	
	},	

	pesquisarItRedeSocialPessoa: function(cdPessoa) {
		var controller = this;
		var storeDb = controller.getCadastroCadastroPessoaRedeSocialPessoaDbStoreStore();
		var storeGrid = controller.getCadastroCadastroPessoaRedeSocialPessoaStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroPessoaController.php?op=getListaRedeSocialPessoa&cdPessoa='+cdPessoa});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaCadastroPessoaEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	pesquisarItEnderecoPessoa: function(cdPessoa) {
		var controller = this;
		var storeDb = controller.getCadastroCadastroPessoaEnderecoPessoaDbStoreStore();
		var storeGrid = controller.getCadastroCadastroPessoaEnderecoPessoaStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroPessoaController.php?op=getListaEnderecoPessoa&cdPessoa='+cdPessoa});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaCadastroPessoaEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	telaCadastroPessoa_btnEditarPessoa_click: function(button) {
		var record = this.getTelaCadastroPessoa().getComponent('gridPessoa').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoPessoa(record[0]);
		}
	},

	telaCadastroPessoa_gridPessoa_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoPessoa(record);
		}
	},

	telaCadastroPessoa_btnExcluirPessoa_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroPessoa().getComponent('gridPessoa').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroPessoa().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroPessoaController.php?op=excluir',
							params: {
								cdPessoa: record[0].get('CD_PESSOA')	
							},
							success: function(response) {
								controller.getTelaCadastroPessoa().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarPessoa();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroPessoa().setLoading(false);
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
	
	telaCadastroPessoa_btnAtualizarLista_click: function(button) {
		this.pesquisarPessoa();	
	},	
	
	telaCadastroPessoa_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroPessoa().getComponent('panPesquisaPessoa').isHidden()) {
			this.getTelaCadastroPessoa().getComponent('panPesquisaPessoa').setVisible(true);
		} else {
			this.getTelaCadastroPessoa().getComponent('panPesquisaPessoa').setVisible(false);
		}
	},

	telaCadastroPessoaEdit_btnSalvar_click: function(button) {
		var controller = this;
		var st = this.getCadastroCadastroPessoaPessoaStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroPessoa.PessoaModel');
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
			//Percorre os endereços e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItEndereco = controller.getCadastroCadastroPessoaEnderecoPessoaStoreStore();
			var listaItEndereco = new Array();
			storeItEndereco.data.each(function(item, index, total) {
				Ext.Array.include(listaItEndereco,item.getData());
			});	
			reg.set('IT_ENDERECOS',Ext.JSON.encode(listaItEndereco));
			//****************************************************************************			
			
			//****************************************************************************
			//Percorre as redes sociais e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItRedeSocial = controller.getCadastroCadastroPessoaRedeSocialPessoaStoreStore();
			var listaItRedeSocial = new Array();
			storeItRedeSocial.data.each(function(item, index, total) {
				Ext.Array.include(listaItRedeSocial,item.getData());
			});	
			reg.set('IT_REDES_SOCIAIS',Ext.JSON.encode(listaItRedeSocial));
			//****************************************************************************			
			
			Ext.Ajax.request({
				url: '../erp/controller/Cadastro/CadastroPessoaController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarPessoa();
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

	CadastroPessoa_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarPessoa();
	},
	
	CadastroPessoa_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroPessoa().getComponent('panPesquisaPessoa').getComponent('edtNmPessoaPesquisa').setValue('');
		this.pesquisarPessoa();
	}
	
});