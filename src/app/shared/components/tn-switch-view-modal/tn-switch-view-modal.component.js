'use strict';

require('./tn-switch-view-modal.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-switch-view-modal/tn-switch-view-modal.component.html',
	controller: ['DS', '$location', '$window',tnSwitchViewModalController],
	bindings:{
		closeSsoModal: '&',
		redirect: '&',
		modalInstance: '<'
	}
};

/* @ngInject */
function tnSwitchViewModalController(DS, $location, $window) {
	var ctrl = this;
	ctrl.saveViewSetting = false;
	ctrl.viewAdminPreference = 'N';

	ctrl.closeSwitchViewModal = function(){
		ctrl.showModal = false;
		ctrl.modalInstance.close("");
		ctrl.modalInstance.dismiss("cancel");
	};

	ctrl.setViewAdmin = function (preference){
		ctrl.viewAdminPreference = preference;
	};

	ctrl.saveViewPreference = function() {
		ctrl.showFullSpinner = true;

		if (ctrl.saveViewSetting === true) { // if checkbox checked then save, else just redirect
			var data = {
				preferenceType  : "VW_PREF_ADMIN",
				preferenceValue : ctrl.viewAdminPreference
			};
			DS.update('preferences', '', data).then(function (results) {
				ctrl.data=results.response;
			}).then(function(){
				ctrl.closeModalAndRedirect();
			}).catch(function(error) {
				ctrl.data=error.response;
			});
		}
		else {
			ctrl.closeModalAndRedirect();
		}
	};

	ctrl.redirectToView = function(){
		if (ctrl.viewAdminPreference === 'Y'){
			$window.open($location.protocol()+'://'+$location.host()+'/admin','_self');
		}
	};

	ctrl.closeModalAndRedirect = function(){
		ctrl.showModal = false;
		ctrl.modalInstance.close("");
		ctrl.modalInstance.dismiss("cancel");
		ctrl.redirectToView();
	};
}
