/**
 * Created by Krishnam Raju on 11/28/2016.
 */
'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.moneyPolicies';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('moneyPolicies', require('./moneyPolicies.service'));
