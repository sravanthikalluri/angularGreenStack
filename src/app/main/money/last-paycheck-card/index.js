'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.last-paycheck-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('lastPaycheckCard', require('./last-paycheck-card.component'));

