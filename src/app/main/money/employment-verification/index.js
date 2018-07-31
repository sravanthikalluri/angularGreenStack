'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.employment-verification';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnEmploymentVerification', require('./employment-verification.component'));
