'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.eforms-acknowledgement';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('eformsAcknowledgement', require('./eforms-acknowledgement.component'));
