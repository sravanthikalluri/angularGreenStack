'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.trinet-reports';
module.exports = moduleName;

angular.module(moduleName,[])
	.component('trinetReports', require('./trinet-reports-card.component'));
