'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.paychecks-symmetry-calculator.paychecks-symmetry-calculator';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('paychecksSymmetryCalculator', require('./paychecks-symmetry-calculator.component'));
