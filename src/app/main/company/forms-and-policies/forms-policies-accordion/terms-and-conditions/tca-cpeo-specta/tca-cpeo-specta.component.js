
/**
 * Created by Krishnam Raju on 8/18/2017.
 */
'use strict';

module.exports = {
	template: require('./tca-cpeo-specta.component.html'),
	controller: [tcaCepoSpectaController],
	bindings: {
		accoridon:'&'
	}
};

function tcaCepoSpectaController() {
	var ctrl = this;
	ctrl.accordionList =[
		{ id:2, name: "Privacy, Accuracy, Use, And Exchange Of Information", isOpen: false}
	];
}
