'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.emp-verify';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('empVerifyService', require('./emp-verify.service.js'));
