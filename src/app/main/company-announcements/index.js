'use strict';

var angular = require('angular');
var moduleName = 'app.main.company-announcements';
module.exports = moduleName;

angular.module(moduleName,[])
	.component('companyAnnouncements', require('./company-announcements.component'));
