'use strict';

require('./tn-proxy-message-modal.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-proxy-message-modal/tn-proxy-message-modal.component.html',
	controller: ['$sce', '$filter', '$state', tnProxyMessageModalController],
	bindings:{
		closeSsoModal: '&',
		redirect: '&',
		modalInstance: '<',
		modalData: '<',
		resolve: '<'
	}
};

/* @ngInject */
function tnProxyMessageModalController($sce, $filter, $state) {
	var ctrl = this;

	ctrl.firstName = ctrl.resolve.modalData.firstName;
	ctrl.lastName = ctrl.resolve.modalData.lastName;
	ctrl.empName = ctrl.resolve.modalData.firstName + " " + ctrl.resolve.modalData.lastName;


  ctrl.closeModal = function(){
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
	}

}
