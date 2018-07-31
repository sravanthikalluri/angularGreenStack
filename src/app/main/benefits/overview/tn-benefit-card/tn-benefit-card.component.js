'use strict';

require('./tn-benefit-card.component.scss');

module.exports = {
	template: require('./tn-benefit-card.component.html'),
	controller: ['$timeout',tnBenefitsCardController],
	bindings: {
		benefit: '<'
	}
};
function tnBenefitsCardController($timeout) {
	var ctrl = this;

	ctrl.$onInit = function(){
		ctrl.showSpinner = true;
	}

	$timeout(function () {
		ctrl.showSpinner=false;
	}, 1000);
};
