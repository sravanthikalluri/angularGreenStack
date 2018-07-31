'use strict';

var angular = require('angular');
var moduleName = 'app.main.profile.profile-map-card';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('profileMapCard', require('./profile-map-card.component'));
