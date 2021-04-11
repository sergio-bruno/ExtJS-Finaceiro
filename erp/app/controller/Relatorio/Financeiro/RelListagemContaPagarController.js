Ext.define('erp.controller.Relatorio.Financeiro.RelListagemContaPagarController', {
    extend: 'Ext.app.Controller',
    stores: [
 		'Generico.PessoaPjStore',
 		'Generico.PessoaStore'
    ],
	views: [
		'Relatorio.Financeiro.RelListagemContaPagar'
    ],
    refs: [
        {
            ref: 'relListagemContaPagar',
            selector: 'relListagemContaPagar'
        }
    ],
 
    init: function() {
        this.control({
			'relListagemContaPagar #btnImprimir': {
				click: this.relListagemContaPagar_btnImprimir_click
			}
        })
    },
	
	carregarRelatorio: function() {
		var controller = this;
		
		var cdPessoaPj = "";
		if (!Ext.isNull(controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('cboCdPessoaPj').getValue())) {
			cdPessoaPj = controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('cboCdPessoaPj').getValue();
		}

		var cdPessoa = "";
		if (!Ext.isNull(controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('cboCdPessoa').getValue())) {
			cdPessoa = controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('cboCdPessoa').getValue();
		}
		
		//Tratamento nas datas
		var dtInicio = '';
		var dtFim = '';
		if (controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue() != '') {
			dtInicio = controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue();
		}
		if (controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue() != '') {
			dtFim = controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtFimPesquisa').getValue();
		}
		
		// verificação qual a data para filtro
		var tipoDataPesquisa = "";
		tipoDataPesquisa = controller.getRelListagemContaPagar().getComponent('panPesquisa').getComponent('fdsDataPesquisa').getComponent('rdgDataPesquisa').getChecked()[0].inputValue;
		
		controller.getRelListagemContaPagar().getComponent('cntRelatorio').setVisible(true);
		controller.getRelListagemContaPagar().getComponent('cntRelatorio').removeAll();
		var frame = Ext.create('Ext.ux.IFrame', {
			src: '../erp/reports/Financeiro/RelListagemContaPagar.php'
				+ '?cdPessoaPj='+cdPessoaPj
				+ '&cdPessoa='+cdPessoa
				+ '&dtInicio='+Ext.Date.format(dtInicio, 'Y-m-d')
				+ '&dtFim='+Ext.Date.format(dtFim, 'Y-m-d')
				+ '&tipoDataPesquisa='+tipoDataPesquisa,
				flex: 1
		});		
		controller.getRelListagemContaPagar().getComponent('cntRelatorio').add(frame);
	},
	
	relListagemContaPagar_btnImprimir_click: function(button) {
		var controller = this;
		controller.carregarRelatorio();
	}
});