'use strict';

require('./tn-confirmation-modal.component.scss');

module.exports = {
	template: require('./tn-confirmation-modal.component.html'),
	controller: ['$state',tnConfirmationModalController],
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

function tnConfirmationModalController($state) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.data = ctrl.resolve.data;
	};

	ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};

	ctrl.ok = function () {
		if(ctrl.data === 'Profile'){
			$state.go('app.main.profile');
		}
		return ctrl.modalInstance.close();
	};
}
