'use strict';

require('./tn-sso-redirect-modal.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-sso-redirect-modal/tn-sso-redirect-modal.component.html',
	controller: ['$window', 'DS', 'SharedDataService', tnSsoRedirectModalController],
	bindings:{
		closeSsoModal: '&',
		redirect: '&',
		modalInstance: '<',
		modalData: '<',
		resolve: '<'
	}
};

/* @ngInject */
function tnSsoRedirectModalController($window, DS, SharedDataService) {
	var ctrl = this;
	ctrl.checkStatus = false;

	ctrl.closeSsoModal = function(){
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
	}

	ctrl.message = ctrl.resolve.modalData.message;

	ctrl.redirect = function(){
		$window.open(ctrl.resolve.modalData.redirectUrl, "_blank")
		ctrl.modalInstance.close("redirect");
	}

	ctrl.suppressModal = function(){
   
		var data = {
			preferenceType  : "THIRD_PARTY_MODAL_HIDE",
			preferenceValue : ctrl.checkStatus ? 'Y' : 'N'
		};
		DS.update('preferences', '', data).then(function (results) {
			ctrl.data=results.response;
		}).catch(function(error) {
			ctrl.data=error.response;
		});
		SharedDataService.getAppSharedData().suppressRedirectModal = ctrl.checkStatus ? 'true' : 'false';
	}
}
