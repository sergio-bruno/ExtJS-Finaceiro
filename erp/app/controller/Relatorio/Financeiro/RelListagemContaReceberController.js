Ext.define('erp.controller.Relatorio.Financeiro.RelListagemContaReceberController', {
    extend: 'Ext.app.Controller',
    stores: [
 		'Generico.PessoaPjStore',
 		'Generico.PessoaStore'
    ],
	views: [
		'Relatorio.Financeiro.RelListagemContaReceber'
    ],
    refs: [
        {
            ref: 'relListagemContaReceber',
            selector: 'relListagemContaReceber'
        }
    ],
 
    init: function() {
        this.control({
			'relListagemContaReceber #btnImprimir': {
				click: this.relListagemContaReceber_btnImprimir_click
			}
        })
    },
	
	carregarRelatorio: function() {
		var controller = this;
		
		var cdPessoaPj = "";
		if (!Ext.isNull(controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('cboCdPessoaPj').getValue())) {
			cdPessoaPj = controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('cboCdPessoaPj').getValue();
		}

		var cdPessoa = "";
		if (!Ext.isNull(controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('cboCdPessoa').getValue())) {
			cdPessoa = controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('cboCdPessoa').getValue();
		}
		
		//Tratamento nas datas
		var dtInicio = '';
		var dtFim = '';
		if (controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue() != '') {
			dtInicio = controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue();
		}
		if (controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue() != '') {
			dtFim = controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue();
		}
		
		// verificação qual a data para filtro
		var tipoDataPesquisa = "";
		tipoDataPesquisa = controller.getRelListagemContaReceber().getComponent('panPesquisa').getComponent('fdsDataPesquisa').getComponent('rdgDataPesquisa').getChecked()[0].inputValue;
		
		controller.getRelListagemContaReceber().getComponent('cntRelatorio').setVisible(true);
		controller.getRelListagemContaReceber().getComponent('cntRelatorio').removeAll();
		var frame = Ext.create('Ext.ux.IFrame', {
			src: '../erp/reports/Financeiro/RelListagemContaReceber.php'
				+ '?cdPessoaPj='+cdPessoaPj
				+ '&cdPessoa='+cdPessoa
				+ '&dtInicio='+Ext.Date.format(dtInicio, 'Y-m-d')
				+ '&dtFim='+Ext.Date.format(dtFim, 'Y-m-d')
				+ '&tipoDataPesquisa='+tipoDataPesquisa,
				flex: 1
		});		
		controller.getRelListagemContaReceber().getComponent('cntRelatorio').add(frame);
	},
	
	relListagemContaReceber_btnImprimir_click: function(button) {
		var controller = this;
		controller.carregarRelatorio();
	}
});