'use strict'

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-city-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnCityInput', require('./tn-city-input.component'));
