'use strict';

require('./tn-current-beneficiaries-card.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/overview/tn-current-beneficiaries-card/tn-current-beneficiaries-card.component.html',
	controller: ['$timeout',tnCurrentBeneCard],
	bindings: {
		data: '<'
	}
};
function tnCurrentBeneCard($timeout){
	var ctrl = this;

	ctrl.$onInit = function(){
		ctrl.showSpinner = true;
	}

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 1000);
}
