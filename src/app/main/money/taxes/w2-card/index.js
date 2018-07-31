'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w2-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('w2Card', require('./w2-card.component'));
