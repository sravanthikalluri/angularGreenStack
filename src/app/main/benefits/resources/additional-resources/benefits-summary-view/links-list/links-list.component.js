'use strict';

require('./links-list.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-summary-view/links-list/links-list.component.html',
	controller: ['DS', '$uibModal',LinksListController],
	bindings: {
		summaryData:'<',
		startDate: '<',
		endDate: '<',
		planType: '<',
		planKey:'<',
		planCode: '<'
	}
};
/* @ngInject */
function LinksListController(DS, $uibModal) {
	var ctrl = this;
ctrl.$onInit=function(){

}
	ctrl.openExecutiveModal = function() {
		ctrl.dataForModal = {
			summaryData: ctrl.summaryData,
			startDate: ctrl.startDate,
			endDate: ctrl.endDate,
			planType: ctrl.planType,
			planKey: ctrl.planKey,
			planCode: ctrl.planCode
		}

		$uibModal.open({
				animation: true,
				template: '<executive></executive>',
				component: 'executive',
				controllerAs: 'ctrl',
				windowClass: 'benefits-modal-dialog',
				resolve: {
					modalData: function() {
						return ctrl.dataForModal;
					}
				}
			}
		)
	};
}
