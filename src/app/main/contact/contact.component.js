'use strict';

require('./contact.component.scss');

module.exports = {
	template: require('./contact.component.html'),
	controller: ['DS','gso',ContactController]
};
/* @ngInject */
function ContactController(DS,gso) {
	var ctrl = this;
	ctrl.isAmbrose = gso.getAppConfig().peoId === 'AMB';
	ctrl.companyStatus = (gso.getAppConfig().companyId === "001" || gso.getAppConfig().companyId === "002");
	ctrl.$onInit = function() {
/*		DS.find('contact','').then(function(results) {
			results.businessContacts.filter(function (contact) {
				if (contact.phoneNumber) {
					contact.phoneNumber = contact.phoneNumber.replace(/[^\d]+/gi, "-");
				}
			});
			ctrl.contactInfo = results;
		}).catch(function(err) {
			console.log(err);
		});*/
		var trinetInfo = {
			"contactType":"Employee Solution Center",
			"phone":"800-638-0461",
			"hoursOfOperation": {
				"availDays": "Monday-Friday",
				"fromTime": (ctrl.companyStatus) ? "8 a.m.":"4:30 a.m.",
				"toTime": (ctrl.companyStatus) ? "5 p.m.":"9:00 p.m.",
				"timeZone": "PT"
			},
			"email": (ctrl.companyStatus) ? "myhr@trinet.com":"employees@trinet.com"
		};

		var peoId = gso.getAppConfig().peoId;
		if(peoId === 'AMB' && trinetInfo.email !== 'hrserviceteam@trinet.com'){
			trinetInfo.email = 'hrserviceteam@trinet.com';
		}

		ctrl.contactInfo = {
			supportContact : trinetInfo
		}

	};
}
