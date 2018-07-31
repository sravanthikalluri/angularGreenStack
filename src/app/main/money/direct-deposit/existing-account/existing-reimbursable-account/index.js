'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.existing-account.existing-reimbursable-account';


module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnExistingReimbursableAccount', require('./existing-reimbursable-account.component'));
