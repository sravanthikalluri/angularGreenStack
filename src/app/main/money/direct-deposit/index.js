'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit';
var editAccountModule = require('./edit-account');
var existingAccountModule = require('./existing-account');
var newAccountModule = require('./new-account');
var lastPaycheckModule = require('./last-paycheck');

module.exports = moduleName;

angular.module(moduleName, [editAccountModule,existingAccountModule,newAccountModule,lastPaycheckModule])
	.component('tnDirectDeposit', require('./direct-deposit.component'));
