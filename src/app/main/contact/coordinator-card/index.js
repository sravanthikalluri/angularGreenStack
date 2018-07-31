'use strict';

var angular = require('angular');
var moduleName = 'app.main.contact.coordinator-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('coordinatorCard', require('./coordinator-card.component.js'));
