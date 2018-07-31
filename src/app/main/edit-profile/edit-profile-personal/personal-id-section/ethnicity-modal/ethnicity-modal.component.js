'use strict';

require('./ethnicity-modal.component.scss');

module.exports = {
	template: require('./ethnicity-modal.component.html'),
	controller: EthnicityModalController,
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

function EthnicityModalController() {
	var ctrl = this;
ctrl.$onInit=function(){

}
	ctrl.onCancel = function() {
    	ctrl.modalInstance.dismiss();
    };

    ctrl.onSave = function() {
    	ctrl.modalInstance.close();
    };
}
