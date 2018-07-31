'use strict';

var angular = require('angular');
var totalCompensationPayModule = require('./total-compensation-pay');
var totalCompensationBenefitsModule = require('./total-compensation-benefits');
var totalCompensationFooterModule = require('./total-compensation-footer');
var moduleName = 'app.main.money.total-compensation';

module.exports = moduleName;

angular.module(moduleName,[totalCompensationPayModule,totalCompensationBenefitsModule,totalCompensationFooterModule])
	.component('totalCompensation', require('./total-compensation.component'));

