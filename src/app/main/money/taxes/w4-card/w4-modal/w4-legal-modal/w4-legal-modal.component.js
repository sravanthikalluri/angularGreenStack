'use strict';

require('./w4-legal-modal.component.scss');

module.exports = {
	template: require('./w4-legal-modal.component.html'),
	controller: ['taxWithholdingForm','$filter', '$rootScope',W4LegalModalController],
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

/* @ngInject */
function W4LegalModalController(taxWithholdingForm,$filter, $rootScope) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.hideSP = true;
		ctrl.data = ctrl.resolve.data;

		if (ctrl.data.substantialText) {
			ctrl.confirmationMessage = ctrl.data.affirmationText  + '<br/> ' + $filter('translate')('money.tax_With_Holding.NonResidentConfirmationMsg');
		}else{
			ctrl.confirmationMessage = ctrl.data.affirmationText;
		}
	};

	ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};

	ctrl.hideSPTest = function () {
		ctrl.hideSP = !ctrl.hideSP;
	};

	ctrl.openSPTest = function () {
		ctrl.hideSP = false;
	};

	ctrl.save = function() {
		taxWithholdingForm
			.save(ctrl.data)
			.then(function(response) {
				$rootScope.$broadcast('setMessage', response);
			    ctrl.modalInstance.close();
			  }).catch(function(err) { console.log(err); });
	};
}
