
'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.money-forms';
module.exports = moduleName;

angular.module(moduleName, [])
	.component('moneyForms', require('./money-forms.component'))
