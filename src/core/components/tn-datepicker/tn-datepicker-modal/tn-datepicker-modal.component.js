'use strict';

require('./tn-datepicker-modal.component.scss');

module.exports = {
	template: require('./tn-datepicker-modal.component.html'),
		controller: tnDatepickerModalController,
		transclude: true,
		bindings: {
			data: '<',
			onShow: '=',
			modalHeader: '=',
			title: '@',
			events: '<',
			eventKeys: '<',
			payrollData: '<',
			isPayrollAdmin:'<'
		}
};

function tnDatepickerModalController() {
	var ctrl = this;

	ctrl.onClose = function(){
		ctrl.onShow = false;
		angular.element(document.querySelector("button#viewPayrollScheduleBtn")).focus();
	};

	ctrl.$onInit = function() {
		if(ctrl.modalHeader === undefined || ctrl.modalHeader === true ){
			ctrl.header = true;
		}
		else {
			ctrl.header = false;
		}
	};

	ctrl.moveFocusToClose = function () {
		  angular.element(document.querySelector("#datepicker-modal-close")).focus();
	};
}
