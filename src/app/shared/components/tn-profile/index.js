'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.tn-profile';
var modules = [
	require('./tn-profile-work'),
	require('./tn-profile-personal'),
	require('./tn-profile-emergency')
];

module.exports = moduleName;

angular.module(moduleName, modules)
	.component('tnProfile', require('./tn-profile.component'));
