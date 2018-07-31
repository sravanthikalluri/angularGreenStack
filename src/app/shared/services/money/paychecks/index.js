'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.paychecks';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Paychecks', require('./paychecks.service'))
	.service('PaycheckCity', require('./paycheck-city.service'))
	.service('CompensationStatements', require('./compensation-statements.service'))
	.service('CheckSummaries', require('./check-summaries.service'));
