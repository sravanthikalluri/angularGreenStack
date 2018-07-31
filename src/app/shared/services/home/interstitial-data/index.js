'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.interstitial-data';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('InterstitialDataService', require('./interstitial-data.service'));
