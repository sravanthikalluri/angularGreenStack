'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.tn-profile.tn-profile.emergency';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnProfileEmergency', require('./tn-profile-emergency.component'));
