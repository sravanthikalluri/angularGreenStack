'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.total-compensation.total-compensation-footer';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('totalCompensationFooter', require('./total-compensation-footer.component'));
