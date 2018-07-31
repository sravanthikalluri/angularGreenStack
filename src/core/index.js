module.exports = 'trinet.core';

var angular = require('angular');
angular.module('trinet.core', [
	require('./components'),
	require('./directives'),
	require('./filters')
]);
