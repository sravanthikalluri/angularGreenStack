'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.total-compensation.total-compensation-pay';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('totalCompensationPay', require('./total-compensation-pay.component'));
