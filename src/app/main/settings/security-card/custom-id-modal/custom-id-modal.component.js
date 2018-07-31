'use strict';

require('./custom-id-modal.component.scss');

module.exports = {
	template: require('./custom-id-modal.component.html'),
	controller: CustomIdModalController,
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

function CustomIdModalController() {
	var ctrl = this;
	ctrl.focusValue = false;
	ctrl.$onInit = function() {
		ctrl.showFullSpinner = false;
		var modalData = ctrl.resolve.data;

		ctrl.data = {
			name: modalData.name,
			method: modalData.customId ? 'PUT' : 'POST',
			payload: {
				employeeId: modalData.employeeId,
				customId: '',
				personKeyType: 5
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
    ctrl.showErrorFlyout = function(value){
		if(value === 'undefined' || value == ''){
			ctrl.focusValue = true;
		}else{
			ctrl.focusValue = false;
		}
    };
}
