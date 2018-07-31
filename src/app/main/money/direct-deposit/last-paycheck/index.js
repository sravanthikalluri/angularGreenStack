'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.last-paycheck';


module.exports = moduleName;

angular.module(moduleName, [])
	.component('lastPaycheck', require('./last-paycheck.component'));
