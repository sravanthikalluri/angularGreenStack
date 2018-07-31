'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.compensation';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('compensation', require('./compensation.service'));
