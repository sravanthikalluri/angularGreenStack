'use strict';

require('./preferences-modal.component.scss');

module.exports = {
	template: require('./preferences-modal.component.html'),
	controller: ['$filter',PreferenceModalController],
	bindings:{
		modalInstance: '<',
		resolve: '<'
	}
};

/* @ngInject */
function PreferenceModalController($filter) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.html = $filter('translate')(ctrl.resolve.html);
	};

    ctrl.onCancel = function() {
    	ctrl.modalInstance.dismiss(ctrl.html);
    };

    ctrl.onContinue = function() {
    	ctrl.modalInstance.close(ctrl.html);
    };
}
