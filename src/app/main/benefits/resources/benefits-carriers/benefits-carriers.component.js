'use strict';

require('./benefits-carriers.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/benefits-carriers/benefits-carriers.component.html',
	controller: ['DS','gso',BenefitsCarriersController]
};
/* @ngInject */
function BenefitsCarriersController(DS,gso) {
	var ctrl = this;
  ctrl.assistancePlanToggle = {};
	ctrl.error = null;

	ctrl.$onInit = function() {

		ctrl.assistancePlanToggle.isOpen = false;

		DS.find('benefits-forms','forms?countryCode='+gso.getAppConfig().countryCode+'&module=benefits').then(function(results) {
			ctrl.benefitFormData = results.forms;
		}).catch(function(err) {
			ctrl.error = err;
			ctrl.errorMessage = err.data._error.message;
		});
		DS.find('benefits-summary-plan','').then(function(response) {
			ctrl.summaryPlanPdfData = response.benefitsSummaryPlan;
			ctrl.employeeAssistancePlan = response.benefitsSummaryPlan.employeeAssistancePlan ? response.benefitsSummaryPlan.employeeAssistancePlan[0].sub[0].subpanes: null;
		}).catch(function(err) {
			ctrl.error = err;
			//ctrl.errorMessage = err.data._error.message;
		});
	};
}
