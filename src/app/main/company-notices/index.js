'use strict';

var angular = require('angular');
var moduleName = 'app.main.company-notices';
module.exports = moduleName;

angular.module(moduleName,[])
	.component('comapnyNotices', require('./notices.component'));
