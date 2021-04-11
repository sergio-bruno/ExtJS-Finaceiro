Ext.define('erp.controller.Cadastro.CadastroFornecedorController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroFornecedor.FornecedorStore',
		'Cadastro.CadastroFornecedor.EnderecoFornecedorStore',
		'Cadastro.CadastroFornecedor.EnderecoFornecedorDbStore',
		'Generico.TipoContatoStore',
		'Generico.CidadeStore',
		'Generico.TipoLogradouroStore',
		'Generico.TipoEnderecoStore',
		'Cadastro.CadastroFornecedor.ContatoFornecedorStore',
		'Cadastro.CadastroFornecedor.ContatoFornecedorDbStore'
    ],
	views: [
		'Cadastro.CadastroFornecedor.TelaCadastroFornecedor',
		'Cadastro.CadastroFornecedor.TelaCadastroFornecedorEdit',
		'Cadastro.CadastroFornecedor.GridFornecedor',
		'Cadastro.CadastroFornecedor.GridItEnderecoFornecedor',
		'Cadastro.CadastroFornecedor.GridItContatoFornecedor'
    ],
    refs: [
        {
            ref: 'telaCadastroFornecedor',
            selector: 'telaCadastroFornecedor'
        },
        {
            ref: 'telaCadastroFornecedorEdit',
            selector: 'telaCadastroFornecedorEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroFornecedor': {
				afterrender: this.telaCadastroFornecedor_afterrender,
				beforedestroy: this.telaCadastroFornecedor_beforedestroy
            },
			'telaCadastroFornecedor #btnNovoFornecedor': {
				click: this.telaCadastroFornecedor_btnNovoFornecedor_click
			},
			'telaCadastroFornecedor #btnEditarFornecedor': {
				click: this.telaCadastroFornecedor_btnEditarFornecedor_click
			},	
			'telaCadastroFornecedor #gridFornecedor': {
				itemdblclick: this.telaCadastroFornecedor_gridFornecedor_itemdblclick
			},
			'telaCadastroFornecedor #btnExcluirFornecedor': {
				click: this.telaCadastroFornecedor_btnExcluirFornecedor_click
			},
			'telaCadastroFornecedor #btnAtualizarLista': {
				click: this.telaCadastroFornecedor_btnAtualizarLista_click
			},
			'telaCadastroFornecedor #btnFiltroPesquisa': {
				click: this.telaCadastroFornecedor_btnFiltroPesquisa_click
			},	
			'telaCadastroFornecedorEdit #btnSalvar': {
				click: this.telaCadastroFornecedorEdit_btnSalvar_click
			},
			'telaCadastroFornecedor #btnPesquisarPesquisa': {
				click: this.CadastroFornecedor_btnPesquisarPesquisa_click
			},
			'telaCadastroFornecedor #btnLimparPesquisa': {
				click: this.CadastroFornecedor_btnLimparPesquisa_click
			},
			// tela de edição
            'telaCadastroFornecedorEdit': {
				beforedestroy: this.telaCadastroFornecedorEdit_beforedestroy
            },
			// Cadastro de endereços
			'telaCadastroFornecedorEdit #cboCdTipoEndereco': {
				change: this.telaCadastroFornecedorEdit_cboCdTipoEndereco_change
			},
			'telaCadastroFornecedorEdit #cboCdTipoLogradouro': {
				change: this.telaCadastroFornecedorEdit_cboCdTipoLogradouro_change
			},
			'telaCadastroFornecedorEdit #cboCdCidade': {
				change: this.telaCadastroFornecedorEdit_cboCdCidade_change
			},
			'telaCadastroFornecedorEdit #btnNovoItEnderecoFornecedor': {
				click: this.telaCadastroFornecedorEdit_btnNovoItEnderecoFornecedor_click
			},
			'telaCadastroFornecedorEdit #btnSalvarItEnderecoFornecedor': {
				click: this.telaCadastroFornecedorEdit_btnSalvarItEnderecoFornecedor_click
			},
			'telaCadastroFornecedorEdit #btnExcluirItEnderecoFornecedor': {
				click: this.telaCadastroFornecedorEdit_btnExcluirItEnderecoFornecedor_click
			},
			'telaCadastroFornecedorEdit #gridItEnderecoFornecedor': {
				itemdblclick: this.telaCadastroFornecedorEdit_gridItEnderecoFornecedor_itemdblclick
			},
			// Cadastro de contatos
			'telaCadastroFornecedorEdit #btnExcluirContatoFornecedor': {
				click: this.telaCadastroFornecedorEdit_btnExcluirContatoFornecedor_click
			},
			'telaCadastroFornecedorEdit #btnNovoContatoFornecedor': {
				click: this.telaCadastroFornecedorEdit_btnNovoContatoFornecedor_click
			},
			'telaCadastroFornecedorEdit #btnSalvarContatoFornecedor': {
				click: this.telaCadastroFornecedorEdit_btnSalvarContatoFornecedor_click
			},
			'telaCadastroFornecedorEdit #gridItContatoFornecedor': {
				itemdblclick: this.telaCadastroFornecedorEdit_gridItContatoFornecedor_itemdblclick
			},
			'telaCadastroFornecedorEdit #cboCdTipoContato': {
				change: this.telaCadastroFornecedorEdit_cboCdTipoContato_change
			}
        })   
    },
	
	telaCadastroFornecedorEdit_btnExcluirContatoFornecedor_click: function(button) {
		var store = this.getCadastroCadastroFornecedorContatoFornecedorStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum contato foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('gridItContatoFornecedor').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir este contato?",
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
				Ext.msgbox.msg('Aviso', 'Selecione primeiro um contato na lista...', 'W', 8000);		
			}
		}
	},

	telaCadastroFornecedorEdit_btnNovoItEnderecoFornecedor_click: function(button) {
		this.limpaDadosEndereco();
	},
	
	telaCadastroFornecedorEdit_btnNovoContatoFornecedor_click: function(button) {
		this.limpaDadosContato();
	},
	
	telaCadastroFornecedorEdit_btnSalvarContatoFornecedor_click: function(button) {
		var controller = this;

		if (controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNmContato').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o nome do contato...', 'W', 8000);	
		} else {
			var cdContato = controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdContato').getValue();
			var store = controller.getCadastroCadastroFornecedorContatoFornecedorStoreStore();
			// Para alterar um contato
			if ( cdContato != "" && cdContato != null ) {
				// percorer a lista e alterar o contato selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_CONTATO') == cdContato ) {
							rec.set('CD_PESSOA_PJ',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('edtCdPessoaPj').getValue());
							rec.set('NM_CONTATO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNmContato').getValue());
							rec.set('DS_EMAIL',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtDsEmailContato').getValue());
							rec.set('NR_TELEFONE_1',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').getValue());
							rec.set('NR_TELEFONE_2',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').getValue());
							rec.set('CD_TIPO_CONTATO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdTipoContato').getValue());
							rec.set('DS_TIPO_CONTATO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('cboCdTipoContato').getRawValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Cadastro.CadastroFornecedor.ContatoFornecedorModel');
				record.set('CD_PESSOA_PJ',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('edtCdPessoaPj').getValue());
				record.set('CD_CONTATO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdContato').getValue());
				record.set('NM_CONTATO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNmContato').getValue());
				record.set('DS_EMAIL',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtDsEmailContato').getValue());
				record.set('NR_TELEFONE_1',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').getValue());
				record.set('NR_TELEFONE_2',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').getValue());
				record.set('CD_TIPO_CONTATO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdTipoContato').getValue());
				record.set('DS_TIPO_CONTATO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('cboCdTipoContato').getRawValue());
				store.add(record);
			}
			controller.limpaDadosContato();
		}
	},
	
	// limpar os dados do endereço da tela
	limpaDadosContato: function() {
		var controller = this;
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdContato').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNmContato').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtDsEmailContato').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdTipoContato').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('cboCdTipoContato').clearValue();
	},
	
	telaCadastroFornecedorEdit_gridItContatoFornecedor_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdContato').setValue(record.get('CD_CONTATO'));
			
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNmContato').setValue(record.get('NM_CONTATO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtDsEmailContato').setValue(record.get('DS_EMAIL'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').setValue(record.get('NR_TELEFONE_1'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').setValue(record.get('NR_TELEFONE_2'));

			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdTipoContato').setValue(record.get('CD_TIPO_CONTATO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('cboCdTipoContato').setValue(record.get('CD_TIPO_CONTATO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('cboCdTipoContato').setRawValue(record.get('DS_TIPO_CONTATO'));
		}
	},
	
	telaCadastroFornecedorEdit_gridItEnderecoFornecedor_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdEndereco').setValue(record.get('CD_ENDERECO'));

			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(record.get('CD_TIPO_LOGRADOURO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').setValue(record.get('CD_TIPO_LOGRADOURO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').setRawValue(record.get('DS_TIPO_LOGRADOURO'));
			
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsLogradouro').setValue(record.get('DS_LOGRADOURO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrEndereco').setValue(record.get('NR_ENDERECO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsComplemento').setValue(record.get('DS_COMPLEMENTO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNmbairro').setValue(record.get('NM_BAIRRO'));

			if ( record.get('CD_CIDADE') != "" && record.get('CD_CIDADE') != null ) {
				controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(record.get('CD_CIDADE'));
				controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdCidade').setValue(record.get('CD_CIDADE'));
				controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdCidade').setRawValue(record.get('CD_UF')+ " - " +record.get('DS_CIDADE') );
			} else {
				controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(null);
				controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdCidade').setValue(null);
				controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdCidade').setRawValue(null);
			}

			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setRawValue(record.get('DS_TIPO_ENDERECO'));
			
			controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrCep').setValue(record.get('NR_CEP'));
		}
	},
	
	telaCadastroFornecedorEdit_btnExcluirItEnderecoFornecedor_click: function(button) {
		var store = this.getCadastroCadastroFornecedorEnderecoFornecedorStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum endereço foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('gridItEnderecoFornecedor').getSelectionModel().getSelection();
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

	telaCadastroFornecedorEdit_cboCdTipoContato_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabContatos').getComponent('edtCdTipoContato').setValue(newValue);
	},
	
	telaCadastroFornecedorEdit_cboCdTipoEndereco_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(newValue);
	},
	
	telaCadastroFornecedorEdit_cboCdTipoLogradouro_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(newValue);
	},
	
	telaCadastroFornecedorEdit_cboCdCidade_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(newValue);
	},
	
	telaCadastroFornecedorEdit_btnSalvarItEnderecoFornecedor_click: function(button) {
		var controller = this;

		if (controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o tipo de logradouro...', 'W', 8000);	
		} else if (controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o logradouro...', 'W', 8000);	
		} else if (controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNmbairro').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o bairro...', 'W', 8000);	
		} else if (controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdCidade').getRawValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o município...', 'W', 8000);	
		} else {
			var cdEndereco = controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdEndereco').getValue();
			var ufCidade = controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdCidade').getRawValue();
			var store = controller.getCadastroCadastroFornecedorEnderecoFornecedorStoreStore();

			// Para alterar um endereço
			if ( cdEndereco != "" && cdEndereco != null ) {
				// percorer a lista e alterar o endereço selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_ENDERECO') == cdEndereco ) {
							rec.set('CD_PESSOA_PJ',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('edtCdPessoaPj').getValue());
							rec.set('DS_LOGRADOURO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue());
							rec.set('CD_TIPO_LOGRADOURO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').getValue());
							//rec.set('DS_TIPO_LOGRADOURO_ABREV','');
							rec.set('DS_TIPO_LOGRADOURO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue());
							rec.set('NR_ENDERECO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrEndereco').getValue());
							rec.set('DS_COMPLEMENTO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsComplemento').getValue());
							rec.set('NM_BAIRRO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNmbairro').getValue());			
							rec.set('CD_CIDADE',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdCidade').getValue());			
							//rec.set('CD_IBGE','');
							rec.set('DS_CIDADE', ufCidade.substr(5,200).trim() );			
							rec.set('CD_UF', ufCidade.substr(0,2) );
							rec.set('NR_CEP',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrCep').getValue());			
							rec.set('CD_TIPO_ENDERECO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').getValue());
							rec.set('DS_TIPO_ENDERECO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').getRawValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Cadastro.CadastroFornecedor.EnderecoFornecedorModel');
				record.set('CD_PESSOA_PJ',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('edtCdPessoaPj').getValue());
				record.set('CD_ENDERECO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdEndereco').getValue());
				record.set('DS_LOGRADOURO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue());
				record.set('CD_TIPO_LOGRADOURO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').getValue());
				//record.set('DS_TIPO_LOGRADOURO_ABREV','');
				record.set('DS_TIPO_LOGRADOURO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue());
				record.set('NR_ENDERECO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrEndereco').getValue());
				record.set('DS_COMPLEMENTO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsComplemento').getValue());
				record.set('NM_BAIRRO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNmbairro').getValue());			
				record.set('CD_CIDADE',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdCidade').getValue());			
				//record.set('CD_IBGE','');
				record.set('DS_CIDADE', ufCidade.substr(5,200).trim() );			
				record.set('CD_UF', ufCidade.substr(0,2) );
				record.set('NR_CEP',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrCep').getValue());			
				record.set('CD_TIPO_ENDERECO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').getValue());
				record.set('DS_TIPO_ENDERECO',controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').getRawValue());
				store.add(record);
			}
			controller.limpaDadosEndereco();
		}
	},

	// limpar os dados do endereço da tela
	limpaDadosEndereco: function() {
		var controller = this;
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdEndereco').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').clearValue();
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsLogradouro').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrEndereco').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtDsComplemento').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNmbairro').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdCidade').clearValue();
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtNrCep').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(null);
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('pnlItensFornecedor').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').clearValue();
	},

	pesquisarFornecedor: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroFornecedorFornecedorStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroFornecedorController.php?op=getListaFornecedor&nmFornecedor='+controller.getTelaCadastroFornecedor().getComponent('panPesquisaFornecedor').getComponent('edtNmFornecedorPesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroFornecedor().setLoading('Aguarde...');
		
		controller.getTelaCadastroFornecedor().getComponent('gridFornecedor').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroFornecedor().getComponent('gridFornecedor') != undefined) {
					controller.getTelaCadastroFornecedor().getComponent('gridFornecedor').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroFornecedorFornecedorStoreStore().removeAll();
			}
			controller.getTelaCadastroFornecedor().setLoading(false);
		});
	},	
	
	telaCadastroFornecedor_afterrender: function(panel) {
		this.pesquisarFornecedor();
	},
	
	telaCadastroFornecedor_beforedestroy: function(panel) {
		this.getCadastroCadastroFornecedorFornecedorStoreStore().removeAll();
	},

	telaCadastroFornecedorEdit_beforedestroy: function(panel) {
		this.getCadastroCadastroFornecedorEnderecoFornecedorStoreStore().removeAll();
		this.getCadastroCadastroFornecedorEnderecoFornecedorDbStoreStore().removeAll();
		
		this.getCadastroCadastroFornecedorContatoFornecedorStoreStore().removeAll();
		this.getCadastroCadastroFornecedorContatoFornecedorDbStoreStore().removeAll();
	},

	telaCadastroFornecedor_btnNovoFornecedor_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroFornecedor.TelaCadastroFornecedorEdit').show();
		
		this.getTelaCadastroFornecedorEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroFornecedorEdit().down('form').getComponent('edtNmRazaoSocial').focus(false,300); 
	},

	prepararEdicaoFornecedor: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroFornecedor.TelaCadastroFornecedorEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		win.setLoading('Carregando...');
	
		// carregar o grid de endereços
		controller.pesquisarItEnderecoFornecedor(record.get('CD_PESSOA_PJ'));

		// carregar o grid de contatos
		controller.pesquisarItContatoFornecedor(record.get('CD_PESSOA_PJ'));
		
		controller.getTelaCadastroFornecedorEdit().down('form').getComponent('edtNmRazaoSocial').focus(false,300);	
	},	

	pesquisarItContatoFornecedor: function(cdPessoaPj) {
		var controller = this;
		var storeDb = controller.getCadastroCadastroFornecedorContatoFornecedorDbStoreStore();
		var storeGrid = controller.getCadastroCadastroFornecedorContatoFornecedorStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroFornecedorController.php?op=getListaContatoFornecedor&cdPessoaPj='+cdPessoaPj});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaCadastroFornecedorEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	pesquisarItEnderecoFornecedor: function(cdPessoaPj) {
		var controller = this;
		var storeDb = controller.getCadastroCadastroFornecedorEnderecoFornecedorDbStoreStore();
		var storeGrid = controller.getCadastroCadastroFornecedorEnderecoFornecedorStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroFornecedorController.php?op=getListaEnderecoFornecedor&cdPessoaPj='+cdPessoaPj});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaCadastroFornecedorEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	telaCadastroFornecedor_btnEditarFornecedor_click: function(button) {
		var record = this.getTelaCadastroFornecedor().getComponent('gridFornecedor').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoFornecedor(record[0]);
		}
	},

	telaCadastroFornecedor_gridFornecedor_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoFornecedor(record);
		}
	},

	telaCadastroFornecedor_btnExcluirFornecedor_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroFornecedor().getComponent('gridFornecedor').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroFornecedor().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroFornecedorController.php?op=excluir',
							params: {
								cdPessoaPj: record[0].get('CD_PESSOA_PJ')	
							},
							success: function(response) {
								controller.getTelaCadastroFornecedor().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarFornecedor();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroFornecedor().setLoading(false);
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
	
	telaCadastroFornecedor_btnAtualizarLista_click: function(button) {
		this.pesquisarFornecedor();	
	},	
	
	telaCadastroFornecedor_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroFornecedor().getComponent('panPesquisaFornecedor').isHidden()) {
			this.getTelaCadastroFornecedor().getComponent('panPesquisaFornecedor').setVisible(true);
		} else {
			this.getTelaCadastroFornecedor().getComponent('panPesquisaFornecedor').setVisible(false);
		}
	},

	telaCadastroFornecedorEdit_btnSalvar_click: function(button) {
		var controller = this;
		var st = this.getCadastroCadastroFornecedorFornecedorStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroFornecedor.FornecedorModel');
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
			var storeItEndereco = controller.getCadastroCadastroFornecedorEnderecoFornecedorStoreStore();
			var listaItEndereco = new Array();
			storeItEndereco.data.each(function(item, index, total) {
				Ext.Array.include(listaItEndereco,item.getData());
			});	
			reg.set('IT_ENDERECOS',Ext.JSON.encode(listaItEndereco));
			//****************************************************************************			
			
			//****************************************************************************
			//Percorre os contatos e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItContato = controller.getCadastroCadastroFornecedorContatoFornecedorStoreStore();
			var listaItContato = new Array();
			storeItContato.data.each(function(item, index, total) {
				Ext.Array.include(listaItContato,item.getData());
			});	
			reg.set('IT_CONTATOS',Ext.JSON.encode(listaItContato));

			/* workaround - resolver o problema que o sistema está adicionando uma vírgula no final do e-mail */
			var eMail = reg.get('DS_EMAIL');
			eMail = eMail.substr(0,eMail.length - 1);
			reg.set('DS_EMAIL',eMail);
			
			Ext.Ajax.request({
				url: '../erp/controller/Cadastro/CadastroFornecedorController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarFornecedor();
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

	CadastroFornecedor_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarFornecedor();
	},
	
	CadastroFornecedor_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroFornecedor().getComponent('panPesquisaFornecedor').getComponent('edtNmFornecedorPesquisa').setValue('');
		this.pesquisarFornecedor();
	}
	
});