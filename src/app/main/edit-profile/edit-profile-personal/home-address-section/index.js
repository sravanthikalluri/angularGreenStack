'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-personal.home-address-section';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('homeAddressSection', require('./home-address-section.component'));
