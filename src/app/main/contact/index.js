/**
 * Created by lhchough on 9/9/16.
 */
'use strict';

var angular = require('angular');
var moduleName = 'app.main.contact';
var modules = [
	require('./employee-card'),
	require('./coordinator-card'),
	require('./casemanagement-card')
];

module.exports = moduleName;

angular.module(moduleName, modules)
	.component('contact', require('./contact.component'));
