'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.new-account';
var newAccountSecondaryContainer = require('./secondary-container');


module.exports = moduleName;

angular.module(moduleName, [newAccountSecondaryContainer])
	.component('tnNewAccount', require('./new-account.component'));
