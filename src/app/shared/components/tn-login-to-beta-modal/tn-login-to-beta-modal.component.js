'use strict';

require('./tn-login-to-beta-modal.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-login-to-beta-modal/tn-login-to-beta-modal.component.html',
	controller: ['DS','$uibModal',tnLoginToBetaModalController],
	bindings:{
		closeSsoModal: '&',
		redirect: '&',
		modalInstance: '<'
	}
};

/* @ngInject */
function tnLoginToBetaModalController(DS,$uibModal) {
	var ctrl = this;

	var data = {
		preferenceType  : "BETA_PREF",
		preferenceValue : ''
	};

	//ToDo: Modal pop-up for even driven Notices
    function openEventDriveNoticesModal(){
        var modal = $uibModal.open({
            template  : '<tn-browser-modal></tn-browser-modal>',
            component : 'tnBrowserModal',
            windowClass : 'tn-browser-model',
            resolve   : {
                data: function() { return ctrl.noticeEvents; }
            }
        });

        return modal.result;
     }

	ctrl.closeLoginToBetaModal = function(){
	    DS.find('notices-event','').then(function(results){
            ctrl.noticeEvents = results.res;
            ctrl.noticeEvents.length > 0 ? openEventDriveNoticesModal(ctrl.noticeEvents) : angular.noop();
        });
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close(data); // pass data from modal back to originating window
	};

	ctrl.setBetaPreference = function(preferenceValue) {
		ctrl.showFullSpinner = true;
		data.preferenceValue = preferenceValue;
		DS.update('preferences', '', data).then(function (results) {
			ctrl.data=results.response;
		}).then(function(){
            DS.find('notices-event','').then(function(results){
                ctrl.noticeEvents = results.res;
                ctrl.noticeEvents.length > 0 ? openEventDriveNoticesModal(ctrl.noticeEvents) : angular.noop();
            });
		}).catch(function(error) {
			ctrl.data=error.response;
		});
		ctrl.showModal = false;
		ctrl.modalInstance.close(data); // pass data from modal back to originating window
		ctrl.modalInstance.dismiss("cancel");
	};
}
