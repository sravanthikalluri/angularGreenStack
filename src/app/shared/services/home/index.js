'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home';

module.exports = moduleName;

angular.module(moduleName, [
	require('./microservices-config'),
	require('./hrpsession-services'),
	require('./emp-info'),
	require('./company'),
	require('./emp-details'),
	require('./sign-out'),
	require('./permissions'),
	require('./cache'),
	require('./interstitial-data')
]);
