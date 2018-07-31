'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.paychecks-and-statements';
var paycheckHistoryTableModule = require('./paycheck-history-table');
var paychecksSymmetryCalculatorModule = require('./paychecks-symmetry-calculator');

module.exports = moduleName;

angular.module(moduleName, [paycheckHistoryTableModule,paychecksSymmetryCalculatorModule])
	.component('paychecksAndStatements', require('./paychecks-and-statements.component'));
