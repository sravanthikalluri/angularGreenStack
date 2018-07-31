'use strict';

require('./tn-future-modal.component.scss');

module.exports = {
	template: require('./tn-future-modal.component.html'),
	controller: tnFutureModalController,
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

function tnFutureModalController() {
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
