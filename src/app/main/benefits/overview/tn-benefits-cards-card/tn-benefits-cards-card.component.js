'use strict';

require('./tn-benefits-cards-card.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/overview/tn-benefits-cards-card/tn-benefits-cards-card.component.html',
	bindings: {
		data: '<'
	},
	controller: ['$timeout',BenefitCardPrint]
};

function BenefitCardPrint($timeout){
	var ctrl = this;

	ctrl.$onInit = function(){
		ctrl.showSpinner = true;
	}

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 1000);
}
