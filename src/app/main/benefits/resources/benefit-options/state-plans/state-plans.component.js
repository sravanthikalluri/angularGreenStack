'use strict';

require('./state-plans.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/benefit-options/state-plans/state-plans.component.html',
	controller: ['DS','sharedProperties', 'gso', StatePlansController],
	bindings: {
		resolve: '<',
		modalInstance: '<',
		modalData: '<'
	}
};
/* @ngInject */
function StatePlansController(DS,sharedProperties, gso) {
	var ctrl = this;

	ctrl.error = null;

	ctrl.payFrequencyType = null;
	ctrl.companyName = gso.getAppConfig().companyName;
	ctrl.quarterstartDate = null;
	ctrl.quarterendDate = null;
	ctrl.benefitProgram = null;
	ctrl.dataLoaded = null;

	sharedProperties.getStringValue();



	ctrl.$onInit = function() {
		DS.find('benefits-summary-view-plans','').then(function(response) {
			ctrl.payFrequencyData = response.benefitsSummaryViewPlans;
			ctrl.payFrequencyType = ctrl.payFrequencyData.employeePayFrequency;
			ctrl.benefitProgram = ctrl.payFrequencyData.employeeBenefitProgram;
			ctrl.fromDate = ctrl.payFrequencyData.currentPlanStartDate;
			ctrl.toDate = ctrl.payFrequencyData.currentPlanEndDate;

			var options = {
				params: {
					type: 'all',
					benefitPlanId: ctrl.benefitProgram,
					payFrequency: ctrl.payFrequencyType,
					startDate: ctrl.fromDate,
					endDate: ctrl.toDate
				}
			}

			DS.find('benefits-state-plans','', options).then(function(response) {
					ctrl.statesBuildData = response.statePlanData;

					if (ctrl.statesBuildData){
						ctrl.loaderSpinner = false;
						var data = {
							"data": ctrl.statesBuildData
						};
						ctrl.showFiled = sharedProperties.getStringValue();

						ctrl.benefitsDynamicfield = data.data[sharedProperties.getStringValue()];
					}
					else {
						ctrl.error = true;
						ctrl.errorMessage = 'Unable to retrieve data.';
					}
					ctrl.dataLoaded = true;
				}
			);
		}).catch(function(err) {
			ctrl.error = err;
			ctrl.errorMessage = err.data._error.message;
		});
	};

	ctrl.closeModal = function(){
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	}
}
