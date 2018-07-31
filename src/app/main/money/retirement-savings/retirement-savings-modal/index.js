'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.retirement-savings.retirement-savings-modal';


module.exports = moduleName;

angular.module(moduleName, [])
	.component('retirementSavingsModal', require('./retirement-savings-modal.component'));
