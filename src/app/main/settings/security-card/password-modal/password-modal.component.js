'use strict';

require('./password-modal.component.scss');

module.exports = {
	template: require('./password-modal.component.html'),
	controller: ['moment',PasswordModalController],
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

/* @ngInject */
function PasswordModalController(moment) {
	var ctrl = this;

	ctrl.$onInit = function() {
		var modalData = ctrl.resolve.data;
		ctrl.showFullSpinner = false;
		ctrl.data = {
			name: modalData.name,
			method: 'PUT',
			payload: {
				employeeId: modalData.employeeId,
				effectiveDate: moment().format('YYYY-MM-DD'),
				currentPassword: '',
				newPassword: ''
			}
		};
	};

	ctrl.onCancel = function() {
    	ctrl.modalInstance.dismiss(ctrl.data);
    };

    ctrl.onSave = function(formName) {
    	ctrl.showFullSpinner = true;
       if (formName.$valid) {
        	ctrl.modalInstance.close(ctrl.data);
        }
        ctrl.showFullSpinner = false;
    };
}
