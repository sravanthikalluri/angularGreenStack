'use strict';

require('./carrier-contact-info.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/carrier-contact-info/carrier-contact-info.component.html',
	controller: ['DS', BenefitsCarrierContactInfoController],
	bindings: {
		showCard:'<'
	}
};
/* @ngInject */
function BenefitsCarrierContactInfoController(DS) {
	var ctrl = this;
	ctrl.error = null;

	ctrl.$onInit = function() {
		DS.find('benefits-carrier-contacts','').then(function(results) {
			ctrl.benefitsCarrierData = results.benefitsCarrierContacts;
			if(ctrl.showCard){
				ctrl.benefitsCarrierData.map(function (data) {
					data.fiscalYear = data.fiscalYear.split('-')[0].split(',')[1].trim() + " Benefits Carrier Contact Chart";
				});
			}

		}).catch(function(err) {
			ctrl.error = err;
			ctrl.errorMessage = err.data._error.message;
		});
	};
}
