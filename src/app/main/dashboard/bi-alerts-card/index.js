'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.bi-alerts-card';
module.exports = moduleName;

angular.module(moduleName,[])
	.component('biAlertsCard', require('./bi-alerts-card.component'));
