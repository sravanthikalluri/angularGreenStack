'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.total-compensation.total-compensation-benefits';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('totalCompensationBenefits', require('./total-compensation-benefits.component'));
