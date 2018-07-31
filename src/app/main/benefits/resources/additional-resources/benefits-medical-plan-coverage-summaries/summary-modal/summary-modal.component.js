'use strict';

require('./summary-modal.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-medical-plan-coverage-summaries/summary-modal/summary-modal.component.html',
	controller: SummaryModalController,
	bindings: {
		planData:'<',
		resolve: '<',
		modalInstance: '<'
	}
};
/* @ngInject */
function SummaryModalController() {

	var ctrl = this;
	ctrl.$onInit=function(){

	};
	ctrl.pane = ctrl.resolve.modalObject;
	ctrl.planModelValue = ctrl.resolve.modalData.sbcValue;
	ctrl.closeModal = function(){
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	}
}
