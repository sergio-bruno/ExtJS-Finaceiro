Ext.define('erp.controller.Relatorio.Cadastro.RelListagemPlanoContaController', {
    extend: 'Ext.app.Controller',
	views: [
		'Relatorio.Cadastro.RelListagemPlanoConta'
    ],
    refs: [
        {
            ref: 'relListagemPlanoConta',
            selector: 'relListagemPlanoConta'
        }
    ],
    init: function() {
        this.control({
			'relListagemPlanoConta #btnImprimir': {
				click: this.relListagemPlanoConta_btnImprimir_click
			}
        })
    },
	
	carregarRelatorio: function() {
		var controller = this;
		controller.getRelListagemPlanoConta().getComponent('cntRelatorio').setVisible(true);
		controller.getRelListagemPlanoConta().getComponent('cntRelatorio').removeAll();
		var frame = Ext.create('Ext.ux.IFrame', {
			src: '../erp/reports/Cadastro/RelListagemPlanoConta.php',
			flex: 1
		});		
		controller.getRelListagemPlanoConta().getComponent('cntRelatorio').add(frame);
	},
    
	relListagemPlanoConta_btnImprimir_click: function(button) {
		this.carregarRelatorio();
	}
});