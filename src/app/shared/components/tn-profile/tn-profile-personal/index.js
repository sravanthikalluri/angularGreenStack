'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.tn-profile.tn-profile.personal';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnProfilePersonal', require('./tn-profile-personal.component'));
