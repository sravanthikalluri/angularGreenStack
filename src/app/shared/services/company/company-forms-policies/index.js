'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.company-forms-policies';

module.exports = moduleName;

angular.module(moduleName, [])
	   .service('CompanyFormsService', require('./company-forms.service'))
	   .service('CompanyPoliciesService', require('./company-policies.service'))
	   .service('EmployeeHandbookService', require('./employee-handbook.service'))
	   .service('LegalNoticesService', require('./legal-notices.service'))
	   .service('EformsAcknowledgement', require('./eforms-acknowledgement.service'))
	   .service('GetAcrobatInfoService', require('./get-acrobat-info.service'))
	   .service('CompanyPaidTimeOffService',require('./company-paidtime-policies.service.js'));
