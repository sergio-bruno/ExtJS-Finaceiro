Ext.define('erp.controller.Cadastro.CadastroClienteController', {
    extend: 'Ext.app.Controller',
    stores: [
		'Cadastro.CadastroCliente.ClienteStore',
		'Cadastro.CadastroCliente.EnderecoClienteStore',
		'Cadastro.CadastroCliente.EnderecoClienteDbStore',
		'Generico.TipoContatoStore',
		'Generico.CidadeStore',
		'Generico.CargoStore',
		'Generico.TipoLogradouroStore',
		'Generico.TipoEnderecoStore',
		'Generico.ClassificacaoStore',
		'Generico.StatusClienteStore',
		'Cadastro.CadastroCliente.ContatoClienteStore',
		'Cadastro.CadastroCliente.ContatoClienteDbStore',
		'Cadastro.CadastroCliente.VisitaClienteStore',
		'Cadastro.CadastroCliente.VisitaClienteDbStore'
    ],
	views: [
		'Cadastro.CadastroCliente.TelaCadastroCliente',
		'Cadastro.CadastroCliente.TelaCadastroClienteEdit',
		'Cadastro.CadastroCliente.GridCliente',
		'Cadastro.CadastroCliente.GridItEnderecoCliente',
		'Cadastro.CadastroCliente.GridItContatoCliente',
		'Cadastro.CadastroCliente.GridItVisitaCliente'
    ],
    refs: [
        {
            ref: 'telaCadastroCliente',
            selector: 'telaCadastroCliente'
        },
        {
            ref: 'telaCadastroClienteEdit',
            selector: 'telaCadastroClienteEdit'
        }
    ],
 
    init: function() {
		
        this.control({
            'telaCadastroCliente': {
				afterrender: this.telaCadastroCliente_afterrender,
				beforedestroy: this.telaCadastroCliente_beforedestroy
            },
			'telaCadastroCliente #btnNovoCliente': {
				click: this.telaCadastroCliente_btnNovoCliente_click
			},
			'telaCadastroCliente #btnEditarCliente': {
				click: this.telaCadastroCliente_btnEditarCliente_click
			},	
			'telaCadastroCliente #gridCliente': {
				itemdblclick: this.telaCadastroCliente_gridCliente_itemdblclick
			},
			'telaCadastroCliente #btnExcluirCliente': {
				click: this.telaCadastroCliente_btnExcluirCliente_click
			},
			'telaCadastroCliente #btnAtualizarLista': {
				click: this.telaCadastroCliente_btnAtualizarLista_click
			},
			'telaCadastroCliente #btnFiltroPesquisa': {
				click: this.telaCadastroCliente_btnFiltroPesquisa_click
			},	
			'telaCadastroClienteEdit #btnSalvar': {
				click: this.telaCadastroClienteEdit_btnSalvar_click
			},
			'telaCadastroCliente #btnPesquisarPesquisa': {
				click: this.CadastroCliente_btnPesquisarPesquisa_click
			},
			'telaCadastroCliente #btnLimparPesquisa': {
				click: this.CadastroCliente_btnLimparPesquisa_click
			},
			// tela de edição
            'telaCadastroClienteEdit': {
				beforedestroy: this.telaCadastroClienteEdit_beforedestroy
            },
			// Cadastro cabeçalho
			'telaCadastroClienteEdit #cboCdClassificacao': {
				change: this.telaCadastroClienteEdit_cboCdClassificacao_change
			},
			'telaCadastroClienteEdit #cboCdStatusCliente': {
				change: this.telaCadastroClienteEdit_cboCdStatusCliente_change
			},
			// Cadastro de endereços
			'telaCadastroClienteEdit #cboCdTipoEndereco': {
				change: this.telaCadastroClienteEdit_cboCdTipoEndereco_change
			},
			'telaCadastroClienteEdit #cboCdTipoLogradouro': {
				change: this.telaCadastroClienteEdit_cboCdTipoLogradouro_change
			},
			'telaCadastroClienteEdit #cboCdCidade': {
				change: this.telaCadastroClienteEdit_cboCdCidade_change
			},
			'telaCadastroClienteEdit #btnNovoItEnderecoCliente': {
				click: this.telaCadastroClienteEdit_btnNovoItEnderecoCliente_click
			},
			'telaCadastroClienteEdit #btnSalvarItEnderecoCliente': {
				click: this.telaCadastroClienteEdit_btnSalvarItEnderecoCliente_click
			},
			'telaCadastroClienteEdit #btnExcluirItEnderecoCliente': {
				click: this.telaCadastroClienteEdit_btnExcluirItEnderecoCliente_click
			},
			'telaCadastroClienteEdit #gridItEnderecoCliente': {
				itemdblclick: this.telaCadastroClienteEdit_gridItEnderecoCliente_itemdblclick
			},
			// Cadastro de contatos
			'telaCadastroClienteEdit #btnExcluirContatoCliente': {
				click: this.telaCadastroClienteEdit_btnExcluirContatoCliente_click
			},
			'telaCadastroClienteEdit #btnSalvarContatoCliente': {
				click: this.telaCadastroClienteEdit_btnSalvarContatoCliente_click
			},
			'telaCadastroClienteEdit #btnNovoContatoCliente': {
				click: this.telaCadastroClienteEdit_btnNovoContatoCliente_click
			},
			'telaCadastroClienteEdit #gridItContatoCliente': {
				itemdblclick: this.telaCadastroClienteEdit_gridItContatoCliente_itemdblclick
			},
			'telaCadastroClienteEdit #cboCdTipoContato': {
				change: this.telaCadastroClienteEdit_cboCdTipoContato_change
			},
			'telaCadastroClienteEdit #cboCdCargo': {
				change: this.telaCadastroClienteEdit_cboCdCargo_change
			},
			// Cadastro de visitas
			'telaCadastroClienteEdit #btnExcluirVisitaCliente': {
				click: this.telaCadastroClienteEdit_btnExcluirVisitaCliente_click
			},
			'telaCadastroClienteEdit #btnSalvarVisitaCliente': {
				click: this.telaCadastroClienteEdit_btnSalvarVisitaCliente_click
			},
			'telaCadastroClienteEdit #btnNovaVisitaCliente': {
				click: this.telaCadastroClienteEdit_btnNovaVisitaCliente_click
			},
			'telaCadastroClienteEdit #gridItVisitaCliente': {
				itemdblclick: this.telaCadastroClienteEdit_gridItVisitaCliente_itemdblclick
			}
        })   
    },
	
	// Visita
	telaCadastroClienteEdit_btnExcluirVisitaCliente_click: function(button) {
		var store = this.getCadastroCadastroClienteVisitaClienteStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum registro de visita foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('gridItVisitaCliente').getSelectionModel().getSelection();
			if ( record[0] != undefined ) {
				Ext.Msg.show({
					title:'Confirmação',
					msg: "Deseja realmente excluir este registro de visita?",
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
				Ext.msgbox.msg('Aviso', 'Selecione primeiro um registro de visita na lista...', 'W', 8000);		
			}
		}
	},
	
	telaCadastroClienteEdit_btnSalvarVisitaCliente_click: function(button) {
		var controller = this;

		if (controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtNmVisitante').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o nome do visitante...', 'W', 8000);	
		} else {
			var cdVisita = controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtCdVisita').getValue();
			var store = controller.getCadastroCadastroClienteVisitaClienteStoreStore();
			// Para alterar um contato
			if ( cdVisita != "" && cdVisita != null ) {
				// percorer a lista e alterar o contato selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_VISITA') == cdVisita ) {
							rec.set('CD_PESSOA_PJ',controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdPessoaPj').getValue());
							rec.set('NM_VISITANTE',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtNmVisitante').getValue());
							rec.set('DT_VISITA',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtDtVisita').getValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Cadastro.CadastroCliente.VisitaClienteModel');
				record.set('CD_PESSOA_PJ',controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdPessoaPj').getValue());
				record.set('NM_VISITANTE',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtNmVisitante').getValue());
				record.set('DT_VISITA',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtDtVisita').getValue());
				
				store.add(record);
			}
			controller.limpaDadosVisita();
		}
	},
	
	limpaDadosVisita: function() {
		var controller = this;
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtCdVisita').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtNmVisitante').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtDtVisita').setValue(null);
	},

	telaCadastroClienteEdit_btnNovaVisitaCliente_click: function(button) {
		this.limpaDadosVisita();
	},

	telaCadastroClienteEdit_gridItVisitaCliente_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtCdVisita').setValue(record.get('CD_VISITA'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtNmVisitante').setValue(record.get('NM_VISITANTE'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabVisitas').getComponent('edtDtVisita').setValue(record.get('DT_VISITA'));
		}
	},
	
	// Contato
	telaCadastroClienteEdit_btnExcluirContatoCliente_click: function(button) {
		var store = this.getCadastroCadastroClienteContatoClienteStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum contato foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('gridItContatoCliente').getSelectionModel().getSelection();
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

	telaCadastroClienteEdit_btnNovoItEnderecoCliente_click: function(button) {
		this.limpaDadosEndereco();
	},
	
	telaCadastroClienteEdit_btnNovoContatoCliente_click: function(button) {
		this.limpaDadosContato();
	},
	
	telaCadastroClienteEdit_btnSalvarContatoCliente_click: function(button) {
		var controller = this;

		if (controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNmContato').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o nome do contato...', 'W', 8000);	
		} else {
			var cdContato = controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdContato').getValue();
			var store = controller.getCadastroCadastroClienteContatoClienteStoreStore();
			// Para alterar um contato
			if ( cdContato != "" && cdContato != null ) {
				// percorer a lista e alterar o contato selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_CONTATO') == cdContato ) {
							rec.set('CD_PESSOA_PJ',controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdPessoaPj').getValue());
							rec.set('NM_CONTATO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNmContato').getValue());
							rec.set('DS_EMAIL',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsEmailContato').getValue());
							rec.set('NR_TELEFONE_1',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').getValue());
							rec.set('NR_TELEFONE_2',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').getValue());
							rec.set('CD_TIPO_CONTATO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdTipoContato').getValue());
							rec.set('DS_TIPO_CONTATO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdTipoContato').getRawValue());
							rec.set('CD_CARGO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdCargo').getValue());
							rec.set('DS_CARGO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdCargo').getRawValue());
							rec.set('DS_ELO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsElo').getValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Cadastro.CadastroCliente.ContatoClienteModel');
				record.set('CD_PESSOA_PJ',controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdPessoaPj').getValue());
				record.set('CD_CONTATO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdContato').getValue());
				record.set('NM_CONTATO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNmContato').getValue());
				record.set('DS_EMAIL',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsEmailContato').getValue());
				record.set('NR_TELEFONE_1',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').getValue());
				record.set('NR_TELEFONE_2',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').getValue());
				record.set('CD_TIPO_CONTATO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdTipoContato').getValue());
				record.set('DS_TIPO_CONTATO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdTipoContato').getRawValue());
				record.set('CD_CARGO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdCargo').getValue());
				record.set('DS_CARGO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdCargo').getRawValue());
				record.set('DS_ELO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsElo').getValue());
				store.add(record);
			}
			controller.limpaDadosContato();
		}
	},
	
	// limpar os dados do endereço da tela
	limpaDadosContato: function() {
		var controller = this;
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdContato').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNmContato').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsEmailContato').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdTipoContato').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdTipoContato').clearValue();
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdCargo').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdCargo').clearValue();
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsElo').setValue(null);
	},
	
	telaCadastroClienteEdit_gridItContatoCliente_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdContato').setValue(record.get('CD_CONTATO'));
			
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNmContato').setValue(record.get('NM_CONTATO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsEmailContato').setValue(record.get('DS_EMAIL'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone1Contato').setValue(record.get('NR_TELEFONE_1'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtNrTelefone2Contato').setValue(record.get('NR_TELEFONE_2'));

			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdTipoContato').setValue(record.get('CD_TIPO_CONTATO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdTipoContato').setValue(record.get('CD_TIPO_CONTATO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdTipoContato').setRawValue(record.get('DS_TIPO_CONTATO'));
			
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdCargo').setValue(record.get('CD_CARGO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdCargo').setValue(record.get('CD_CARGO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('cboCdCargo').setRawValue(record.get('DS_CARGO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtDsElo').setValue(record.get('DS_ELO'));
		}
	},
	
	telaCadastroClienteEdit_gridItEnderecoCliente_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) {
			var controller = this;
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdEndereco').setValue(record.get('CD_ENDERECO'));

			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(record.get('CD_TIPO_LOGRADOURO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').setValue(record.get('CD_TIPO_LOGRADOURO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').setRawValue(record.get('DS_TIPO_LOGRADOURO'));
			
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsLogradouro').setValue(record.get('DS_LOGRADOURO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrEndereco').setValue(record.get('NR_ENDERECO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsComplemento').setValue(record.get('DS_COMPLEMENTO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNmbairro').setValue(record.get('NM_BAIRRO'));

			if ( record.get('CD_CIDADE') != "" && record.get('CD_CIDADE') != null ) {
				controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(record.get('CD_CIDADE'));
				controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdCidade').setValue(record.get('CD_CIDADE'));
				controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdCidade').setRawValue(record.get('CD_UF')+ " - " +record.get('DS_CIDADE') );
			} else {
				controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(null);
				controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdCidade').setValue(null);
				controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdCidade').setRawValue(null);
			}

			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setValue(record.get('CD_TIPO_ENDERECO'));
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').setRawValue(record.get('DS_TIPO_ENDERECO'));
			
			controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrCep').setValue(record.get('NR_CEP'));
		}
	},
	
	telaCadastroClienteEdit_btnExcluirItEnderecoCliente_click: function(button) {
		var store = this.getCadastroCadastroClienteEnderecoClienteStoreStore();
		if (store.getCount() <= 0) {
		  Ext.msgbox.msg('Aviso', 'Nenhum endereço foi inserido na lista...', 'W', 8000);		
		} 
		else {
			var record = this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('gridItEnderecoCliente').getSelectionModel().getSelection();
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

	telaCadastroClienteEdit_cboCdClassificacao_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroClienteEdit().down('form').getComponent('edtCdClassificacao').setValue(newValue);
	},

	telaCadastroClienteEdit_cboCdStatusCliente_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroClienteEdit().down('form').getComponent('edtCdStatusCliente').setValue(newValue);
	},

	telaCadastroClienteEdit_cboCdCargo_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdCargo').setValue(newValue);
	},
	
	telaCadastroClienteEdit_cboCdTipoContato_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabContatos').getComponent('edtCdTipoContato').setValue(newValue);
	},
	
	telaCadastroClienteEdit_cboCdTipoEndereco_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(newValue);
	},
	
	telaCadastroClienteEdit_cboCdTipoLogradouro_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(newValue);
	},
	
	telaCadastroClienteEdit_cboCdCidade_change: function(combo, newValue, oldValue, eOpts) {
		this.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(newValue);
	},
	
	telaCadastroClienteEdit_btnSalvarItEnderecoCliente_click: function(button) {
		var controller = this;

		if (controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o tipo de logradouro...', 'W', 8000);	
		} else if (controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o logradouro...', 'W', 8000);	
		} else if (controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNmbairro').getValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o bairro...', 'W', 8000);	
		} else if (controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdCidade').getRawValue() == "") {
			Ext.msgbox.msg('Aviso', 'É necessário informar o município...', 'W', 8000);	
		} else {
			var cdEndereco = controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdEndereco').getValue();
			var ufCidade = controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdCidade').getRawValue();
			var store = controller.getCadastroCadastroClienteEnderecoClienteStoreStore();

			// Para alterar um endereço
			if ( cdEndereco != "" && cdEndereco != null ) {
				// percorer a lista e alterar o endereço selecionado
				if (store.getCount() > 0) { 
					store.data.each(function(rec, index, total) {
						if (rec.get('CD_ENDERECO') == cdEndereco ) {
							rec.set('CD_PESSOA_PJ',controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdPessoaPj').getValue());
							rec.set('DS_LOGRADOURO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue());
							rec.set('CD_TIPO_LOGRADOURO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').getValue());
							//rec.set('DS_TIPO_LOGRADOURO_ABREV','');
							rec.set('DS_TIPO_LOGRADOURO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue());
							rec.set('NR_ENDERECO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrEndereco').getValue());
							rec.set('DS_COMPLEMENTO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsComplemento').getValue());
							rec.set('NM_BAIRRO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNmbairro').getValue());			
							rec.set('CD_CIDADE',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdCidade').getValue());			
							//rec.set('CD_IBGE','');
							rec.set('DS_CIDADE', ufCidade.substr(5,200).trim() );			
							rec.set('CD_UF', ufCidade.substr(0,2) );
							rec.set('NR_CEP',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrCep').getValue());			
							rec.set('CD_TIPO_ENDERECO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').getValue());
							rec.set('DS_TIPO_ENDERECO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').getRawValue());
						}
					});
				}
			} else {
				record = Ext.create('erp.model.Cadastro.CadastroCliente.EnderecoClienteModel');
				record.set('CD_PESSOA_PJ',controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdPessoaPj').getValue());
				record.set('CD_ENDERECO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdEndereco').getValue());
				record.set('DS_LOGRADOURO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsLogradouro').getValue());
				record.set('CD_TIPO_LOGRADOURO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').getValue());
				//record.set('DS_TIPO_LOGRADOURO_ABREV','');
				record.set('DS_TIPO_LOGRADOURO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').getRawValue());
				record.set('NR_ENDERECO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrEndereco').getValue());
				record.set('DS_COMPLEMENTO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsComplemento').getValue());
				record.set('NM_BAIRRO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNmbairro').getValue());			
				record.set('CD_CIDADE',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdCidade').getValue());			
				//record.set('CD_IBGE','');
				record.set('DS_CIDADE', ufCidade.substr(5,200).trim() );			
				record.set('CD_UF', ufCidade.substr(0,2) );
				record.set('NR_CEP',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrCep').getValue());			
				record.set('CD_TIPO_ENDERECO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').getValue());
				record.set('DS_TIPO_ENDERECO',controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').getRawValue());
				store.add(record);
			}
			controller.limpaDadosEndereco();
		}
	},

	// limpar os dados do endereço da tela
	limpaDadosEndereco: function() {
		var controller = this;
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdEndereco').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoLogradouro').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoLogradouro').clearValue();
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsLogradouro').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrEndereco').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtDsComplemento').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNmbairro').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdCidade').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdCidade').clearValue();
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtNrCep').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('edtCdTipoEndereco').setValue(null);
		controller.getTelaCadastroClienteEdit().down('form').getComponent('pnlItensCliente').getComponent('tabEndereco').getComponent('cboCdTipoEndereco').clearValue();
	},

	pesquisarCliente: function() {
		//Efetua a consulta com o parâmetro informado
		var controller = this;
		var store = this.getCadastroCadastroClienteClienteStoreStore();
		
		var prx = store.getProxy();			
		
		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroClienteController.php?op=getListaCliente&nmRazaoSocial='+controller.getTelaCadastroCliente().getComponent('panPesquisaCliente').getComponent('edtNmClientePesquisa').getValue()});
		 
		store.setProxy(prx);
		controller.getTelaCadastroCliente().setLoading('Aguarde...');
		
		controller.getTelaCadastroCliente().getComponent('gridCliente').getSelectionModel().deselectAll(); //Limpa a seleção do grid para evitar registros com dados antigos
		store.loadPage(1);
		store.on('load', function handleLoad(st, records, successful, eOpts) {
			if (store.getCount() > 0) { 
				if (controller.getTelaCadastroCliente().getComponent('gridCliente') != undefined) {
					controller.getTelaCadastroCliente().getComponent('gridCliente').getSelectionModel().select(0); 
				}
			} else {
				controller.getCadastroCadastroClienteClienteStoreStore().removeAll();
			}
			controller.getTelaCadastroCliente().setLoading(false);
		});
	},	
	
	telaCadastroCliente_afterrender: function(panel) {
		this.pesquisarCliente();
	},
	
	telaCadastroCliente_beforedestroy: function(panel) {
		this.getCadastroCadastroClienteClienteStoreStore().removeAll();
	},

	telaCadastroClienteEdit_beforedestroy: function(panel) {
		this.getCadastroCadastroClienteEnderecoClienteStoreStore().removeAll();
		this.getCadastroCadastroClienteEnderecoClienteDbStoreStore().removeAll();
		
		this.getCadastroCadastroClienteContatoClienteStoreStore().removeAll();
		this.getCadastroCadastroClienteContatoClienteDbStoreStore().removeAll();
		
		this.getCadastroCadastroClienteVisitaClienteStoreStore().removeAll();
		this.getCadastroCadastroClienteVisitaClienteDbStoreStore().removeAll();
	},

	telaCadastroCliente_btnNovoCliente_click: function(button) {
		Ext.create('erp.view.Cadastro.CadastroCliente.TelaCadastroClienteEdit').show();
		
		this.getTelaCadastroClienteEdit().down('form').getComponent('ckbSnAtivo').setValue('S'); 
		this.getTelaCadastroClienteEdit().down('form').getComponent('edtNmRazaoSocial').focus(false,300); 
	},

	prepararEdicaoCliente: function(record) {
		var controller = this;
		var win = Ext.create('erp.view.Cadastro.CadastroCliente.TelaCadastroClienteEdit').show();

		//Carrega os dados no form
		win.down('form').loadRecord(record);
		win.setLoading('Carregando...');
	
		controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdClassificacao').setValue(record.get('CD_CLASSIFICACAO'));
		controller.getTelaCadastroClienteEdit().down('form').getComponent('cboCdClassificacao').setValue(record.get('CD_CLASSIFICACAO'));
		controller.getTelaCadastroClienteEdit().down('form').getComponent('cboCdClassificacao').setRawValue(record.get('DS_CLASSIFICACAO'));
	
		controller.getTelaCadastroClienteEdit().down('form').getComponent('edtCdStatusCliente').setValue(record.get('CD_STATUS_CLIENTE'));
		controller.getTelaCadastroClienteEdit().down('form').getComponent('cboCdStatusCliente').setValue(record.get('CD_STATUS_CLIENTE'));
		controller.getTelaCadastroClienteEdit().down('form').getComponent('cboCdStatusCliente').setRawValue(record.get('DS_STATUS_CLIENTE'));
		
		// carregar o grid de endereços
		controller.pesquisarItEnderecoCliente(record.get('CD_PESSOA_PJ'));

		// carregar o grid de contatos
		controller.pesquisarItContatoCliente(record.get('CD_PESSOA_PJ'));
		
		// carregar o grid de contatos
		controller.pesquisarItVisitaCliente(record.get('CD_PESSOA_PJ'));
		
		controller.getTelaCadastroClienteEdit().down('form').getComponent('edtNmRazaoSocial').focus(false,300);	
	},	

	pesquisarItVisitaCliente: function(cdPessoaPj) {
		var controller = this;
		var storeDb = controller.getCadastroCadastroClienteVisitaClienteDbStoreStore();
		var storeGrid = controller.getCadastroCadastroClienteVisitaClienteStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroClienteController.php?op=getListaVisitaCliente&cdPessoaPj='+cdPessoaPj});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaCadastroClienteEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	pesquisarItContatoCliente: function(cdPessoaPj) {
		var controller = this;
		var storeDb = controller.getCadastroCadastroClienteContatoClienteDbStoreStore();
		var storeGrid = controller.getCadastroCadastroClienteContatoClienteStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroClienteController.php?op=getListaContatoCliente&cdPessoaPj='+cdPessoaPj});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaCadastroClienteEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	pesquisarItEnderecoCliente: function(cdPessoaPj) {
		var controller = this;
		var storeDb = controller.getCadastroCadastroClienteEnderecoClienteDbStoreStore();
		var storeGrid = controller.getCadastroCadastroClienteEnderecoClienteStoreStore();
		var prx = storeDb.getProxy();			

		Ext.apply(prx, { url: '../erp/controller/Cadastro/CadastroClienteController.php?op=getListaEnderecoCliente&cdPessoaPj='+cdPessoaPj});
		storeDb.setProxy(prx);
		storeDb.load();
		
		storeDb.on('load', function handleLoad(st, records, successful, eOpts) {
			if (storeDb.getCount() > 0) { 
				Ext.Array.each(records, function(item, index, allItems) {
					storeGrid.add(item);
				});		
			}
			controller.getTelaCadastroClienteEdit().setLoading(false);
			storeDb.un('load',handleLoad);
		});
	},	
	
	telaCadastroCliente_btnEditarCliente_click: function(button) {
		var record = this.getTelaCadastroCliente().getComponent('gridCliente').getSelectionModel().getSelection();
		if (record[0] != undefined) {
			this.prepararEdicaoCliente(record[0]);
		}
	},

	telaCadastroCliente_gridCliente_itemdblclick: function(view, record, item, index, e, eOpts) {
		if (record != undefined) { 
			this.prepararEdicaoCliente(record);
		}
	},

	telaCadastroCliente_btnExcluirCliente_click: function(button) {
		var controller = this;
		var record = controller.getTelaCadastroCliente().getComponent('gridCliente').getSelectionModel().getSelection();
		
		if (record[0] != undefined) {
		
			Ext.Msg.show({
				 title:'Confirmação',
				 msg: 'Deseja realmente excluir o registro selecionado?',
				 minWidth: 200,
				 modal: true,
				 buttons: Ext.Msg.YESNO,
				 fn: function(btn) {
					if (btn == 'yes') {
						controller.getTelaCadastroCliente().setLoading('Aguarde...');
						Ext.Ajax.request({
							url: '../erp/controller/Cadastro/CadastroClienteController.php?op=excluir',
							params: {
								cdPessoaPj: record[0].get('CD_PESSOA_PJ')	
							},
							success: function(response) {
								controller.getTelaCadastroCliente().setLoading(false);
								var res = Ext.JSON.decode(response.responseText);
								if (res.success) {
									controller.pesquisarCliente();
								} else {
									if (res.errorType == 'general') { //Erros de uma maneira geral
										Ext.msgbox.msg('Erro', 'Ocorreu um erro ao excluir o registro selecionado:</br></br><i>'+res.message+'</i>', 'E', 8000);
									} else if (res.errorType == 'business') { //Erros ou mensagens de regra de negócio
										Ext.msgbox.msg('Atenção', res.message, 'W', 5000);
									}
								}
							},
							failure: function(response) {
								controller.getTelaCadastroCliente().setLoading(false);
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
	
	telaCadastroCliente_btnAtualizarLista_click: function(button) {
		this.pesquisarCliente();	
	},	
	
	telaCadastroCliente_btnFiltroPesquisa_click: function(button) {
		if (this.getTelaCadastroCliente().getComponent('panPesquisaCliente').isHidden()) {
			this.getTelaCadastroCliente().getComponent('panPesquisaCliente').setVisible(true);
		} else {
			this.getTelaCadastroCliente().getComponent('panPesquisaCliente').setVisible(false);
		}
	},

	telaCadastroClienteEdit_btnSalvar_click: function(button) {
		var controller = this;
		var st = this.getCadastroCadastroClienteClienteStoreStore();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var model = Ext.ModelMgr.getModel('erp.model.Cadastro.CadastroCliente.ClienteModel');
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
			var storeItEndereco = controller.getCadastroCadastroClienteEnderecoClienteStoreStore();
			var listaItEndereco = new Array();
			storeItEndereco.data.each(function(item, index, total) {
				Ext.Array.include(listaItEndereco,item.getData());
			});	
			reg.set('IT_ENDERECOS',Ext.JSON.encode(listaItEndereco));
			//****************************************************************************			
			
			//****************************************************************************
			//Percorre os contatos e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItContato = controller.getCadastroCadastroClienteContatoClienteStoreStore();
			var listaItContato = new Array();
			storeItContato.data.each(function(item, index, total) {
				Ext.Array.include(listaItContato,item.getData());
			});	
			reg.set('IT_CONTATOS',Ext.JSON.encode(listaItContato));

			//****************************************************************************
			//Percorre os registros de visitas e preenche um array para ser enviado ao PHP
			//****************************************************************************
			var storeItVisita = controller.getCadastroCadastroClienteVisitaClienteStoreStore();
			var listaItVisita = new Array();
			storeItVisita.data.each(function(item, index, total) {
				Ext.Array.include(listaItVisita,item.getData());
			});	
			reg.set('IT_VISITAS',Ext.JSON.encode(listaItVisita));
			
			/* workaround - resolver o problema que o sistema está adicionando uma vírgula no final do e-mail */
			var eMail = reg.get('DS_EMAIL');
			eMail = eMail.substr(0,eMail.length - 1);
			reg.set('DS_EMAIL',eMail);
			
			Ext.Ajax.request({
				url: '../erp/controller/Cadastro/CadastroClienteController.php?op='+op,
				jsonData: Ext.JSON.encode(reg.data),
				success: function(response) {
					win.setLoading(false);
					button.setDisabled(false);
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						win.close();
						controller.pesquisarCliente();
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

	CadastroCliente_btnPesquisarPesquisa_click: function(button) {
		this.pesquisarCliente();
	},
	
	CadastroCliente_btnLimparPesquisa_click: function(button) {
		this.getTelaCadastroCliente().getComponent('panPesquisaCliente').getComponent('edtNmClientePesquisa').setValue('');
		this.pesquisarCliente();
	}
	
});