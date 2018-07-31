'use strict';

require('./carriers.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/carriers/carriers.component.html',
	controller: ['$timeout', 'gso', CarriersController]
};
/* @ngInject */
function CarriersController($timeout, gso) {
	var ctrl = this;
	ctrl.hideCarrier = false;
	var employmentStatus = null;
	var peoId = gso.getAppConfig().peoId;

	ctrl.hideCarrier = (peoId === 'AMB') ? true : false;

	ctrl.$onInit = function () {
		ctrl.showSpinner = true;
	};

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 1000);
}
