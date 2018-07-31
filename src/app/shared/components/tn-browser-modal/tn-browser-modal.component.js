'use strict';

require('./tn-browser-modal.component.scss');

module.exports = {
	template: require('./tn-browser-modal.component.html'),
	controller: ViewNoticesModalController,
	bindings: {
	  modalInstance: '<',
    		resolve: '<'
    	}
};

/* @ngInject */
function ViewNoticesModalController() {
	var ctrl = this;
	ctrl.$onInit = function() {
		ctrl.data = ctrl.resolve.data;
		ctrl.data.map(function (item) {
			item.isAle =  (item.noticeId === "ALE_01") ? true : false;
		})
	};

	ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};

	ctrl.popUpDataCtrl = function(item){
		ctrl.cancel();
	}
}
