'use strict';

require('./general-forms.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/general-forms/general-forms.component.html',
	controller: ['DS','gso',BenefitsCarriersController]
};
/* @ngInject */
function BenefitsCarriersController(DS,gso) {
	var ctrl = this;

	ctrl.error = null;

	ctrl.$onInit = function() {
		DS.find('benefits-forms','forms?countryCode='+gso.getAppConfig().countryCode+'&module=benefits').then(function(results) {
			ctrl.benefitFormData = results.forms;

		}).catch(function(err) {
			ctrl.error = err;
			ctrl.errorMessage = err.data._error.message;
		});
	};
}
