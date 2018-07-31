'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.new-account.secondary-container';



module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnNewAccountSecondaryContainer', require('./secondary-container.component'));
