Ext.define('erp.controller.Relatorio.Cliente.RelListagemClienteAniversarianteController', {
    extend: 'Ext.app.Controller',
	views: [
		'Relatorio.Cliente.RelListagemClienteAniversariante'
    ],
    refs: [
        {
            ref: 'relListagemClienteAniversariante',
            selector: 'relListagemClienteAniversariante'
        }
    ],
    init: function() {
        this.control({
			'relListagemClienteAniversariante #btnImprimir': {
				click: this.relListagemClienteAniversariante_btnImprimir_click
			}
        })
    },
	
	carregarRelatorio: function() {
		var controller = this;
		
		dtInicio = controller.getRelListagemClienteAniversariante().getComponent('panPesquisa').getComponent('fdsPeriodoPesquisa').getComponent('edtDtIniPesquisa').getValue();
		if ( dtInicio == '' || dtInicio == null ) {
			Ext.msgbox.msg('Informação', 'É necessário informar uma data.', 'I', 3000);	
		} else {
			controller.getRelListagemClienteAniversariante().getComponent('cntRelatorio').setVisible(true);
			controller.getRelListagemClienteAniversariante().getComponent('cntRelatorio').removeAll();
			var frame = Ext.create('Ext.ux.IFrame', {
				src: '../erp/reports/Cliente/RelListagemClienteAniversariante.php?dtInicio='+Ext.Date.format(dtInicio, 'Y-m-d'),
				//src: '../erp/reports/Cliente/lixo.php',
				flex: 1
			});		
			controller.getRelListagemClienteAniversariante().getComponent('cntRelatorio').add(frame);
		}
	},
	
	relListagemClienteAniversariante_btnImprimir_click: function(button) {
		var controller = this;
		controller.carregarRelatorio();
	}
});