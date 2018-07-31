'use strict';

module.exports = ContactService;

/* @ngInject */
function ContactService(DS, companyUrlConfig,gso, $filter) {
	return DS.defineResource({
		name: 'contact',
		idAttribute: 'id',
		basePath: '',
		endpoint: companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.manageCompany + '/{companyId}/'+ companyUrlConfig.resources.supportContacts,
		deserialize: function(responseConfig, data) {
			var isTrinetColleagues = (gso.getAppConfig().companyId === "001" || gso.getAppConfig().companyId === "002") ? true : false;
			var trinetInfo = {
					"contactType":"Employee Solution Center",
					"phone":"800-638-0461",
					"hoursOfOperation": {
						"availDays": "Monday-Friday",
						"fromTime": (isTrinetColleagues) ? "8 a.m.":"4:30 a.m.",
						"toTime": (isTrinetColleagues) ? "5 p.m.":"9:00 p.m.",
						"timeZone": "PT"
					},
					"email": (isTrinetColleagues) ? "myhr@trinet.com":"employees@trinet.com"
			};

			var peoId = gso.getAppConfig().peoId;
			var businessContactAMB = '';
			if(peoId === 'AMB' && trinetInfo.email !== 'hrserviceteam@trinet.com'){
				trinetInfo.email = 'hrserviceteam@trinet.com';
			}

			// AMB CSA is with role HR Manager
			if(peoId === 'AMB'){
 					if ($filter('filter')(data.data.data, {contactType:"HR Manager"})[0]) {
							businessContactAMB = $filter('filter')(data.data.data, {contactType:"HR Manager"});
					}
			}

			return {
				id : JSON.stringify(data),
				businessContacts : peoId === 'AMB' ? businessContactAMB : data.data.data,
				supportContact : trinetInfo
			}
		}
	});
}
