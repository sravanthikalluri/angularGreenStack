'use strict';

require('./tn-modal.component.scss');

module.exports = {
	template: require('./tn-modal.component.html'),
		controller: tnModalController,
		transclude: true,
		bindings: {
			onShow: '=',
			modalHeader: '='
		}
};

function tnModalController() {
	var ctrl = this;

	ctrl.onClose = function(){
		ctrl.onShow = false;
	}

	ctrl.$onInit = function() {
		if(ctrl.modalHeader === undefined || ctrl.modalHeader === true ){
			ctrl.header = true;
		}
		else {
			ctrl.header = false;
		}
	}


};

