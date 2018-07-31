'use strict';

require('./benefits-std-security.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/optional-benefits/benefits-std-security/benefits-std-security.component.html',
	controller: ['DS','$location','gso',BenefitsStandardSecurityController],
	bindings: {
		resolve: '<',
		modalInstance: '<',
		index: '<'
	}
};
/* @ngInject */
function BenefitsStandardSecurityController(DS,$location,gso) {
	var ctrl = this;
	ctrl.indexId = ctrl.index;	

	ctrl.closeModal = function(){
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	}
}
