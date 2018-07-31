'use strict';

module.exports = {
	template: require('./tca-cpeo-ta.component.html'),
	controller: [tcaCepoTaController],
	bindings: {
		accoridon:'&',
		data:'<'
	}
};

function tcaCepoTaController() {
	var ctrl = this;
	ctrl.accordionList =[
		{ id:1, name: "TriNet and Your Company", isOpen: false},
		{ id:2, name: "Privacy, Accuracy, Use, And Exchange Of Information", isOpen: false},
		{ id:3, name: "Confirmation Of Roles", isOpen: false},
		{ id:4, name: "The TriNet Platform, Indemnification And Limits Of Liability", isOpen: false},
		{ id:5, name: "Dispute Resolution Protocol (&quot;DRP&quot;)", isOpen: false},
		{ id:6, name: "Acknowledgement", isOpen: false}
	];
}
