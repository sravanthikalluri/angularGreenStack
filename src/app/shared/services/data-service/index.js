'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.data-service';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('PaycheckDataService', require('./paycheck-data.service'))
	.service('TaxesDataService', require('./taxes-data.service'))
	.service('DirectDepositDataService', require('./direct-deposit-data.service'))
	.service('RetirementSavingsDataService', require('./retirement-savings-data.service'))
	.service('ProfileDataService', require('./profile-data.service'))
	.service('OrgChartDataService', require('./org-chart-data.service'))
	.service('formsPoliciesService', require('./froms-policies-data.service'))
	.service('workInboxDataService', require('./work-inbox-data.service'));
