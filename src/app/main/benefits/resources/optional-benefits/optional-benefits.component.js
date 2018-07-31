'use strict';

require('./optional-benefits.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/optional-benefits/optional-benefits.component.html',
	controller: ['gso', OptionalBenefitsController]
};
/* @ngInject */
function OptionalBenefitsController(gso) {
	var ctrl = this;	
	var peoId = gso.getAppConfig().peoId;
	ctrl.hideAflac = (peoId === "AMB") ? true : false;
}