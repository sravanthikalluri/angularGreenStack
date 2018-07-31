'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared';

module.exports = moduleName;

angular.module(moduleName, [
	require('./components'),
	require('./services'),
	require('./filters'),
	require('./constants')
]);
