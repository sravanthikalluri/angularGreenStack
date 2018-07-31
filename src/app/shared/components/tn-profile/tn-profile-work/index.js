'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.tn-profile.tn-profile-work';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnProfileWork', require('./tn-profile-work.component'));
