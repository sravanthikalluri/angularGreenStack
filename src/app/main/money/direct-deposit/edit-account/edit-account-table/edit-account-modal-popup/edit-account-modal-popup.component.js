/**
 * Created by Krishnam Raju on 8/31/2017.
 */
'use strict';

require('./edit-account-modal-popup.component.scss');

module.exports = {
	template: require('./edit-account-modal-popup.component.html'),
	controller: editAccountModalPopupController,
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

/* @ngInject */
function editAccountModalPopupController() {
	var ctrl = this;
	ctrl.accountTypes = ['Checking','Savings'];
	ctrl.$onInit = function() {
		ctrl.modalData = ctrl.resolve.modalData;
	};

	ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};

	ctrl.saveEditAccount = function () {
		ctrl.resolve.modalData.update(ctrl.modalData);
		ctrl.modalInstance.close();
	};
	ctrl.disableSaveBtn = function(){
		return ctrl.modalData.accountNumber && ctrl.modalData.routingNumber && ctrl.modalData.accountType;
	};
}
