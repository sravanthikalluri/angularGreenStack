'use strict';

require('./tn-confirmation-modal.component.scss');

module.exports = {
	template: require('./tn-confirmation-modal.component.html'),
	controller: tnConfirmationModalController,
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

function tnConfirmationModalController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.data = ctrl.resolve.data;
	};

	ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};

	ctrl.ok = function () {
		ctrl.modalInstance.close();
	};
}
