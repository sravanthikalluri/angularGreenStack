'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.company-directory';
var companyDirectoryTableModule = require('./company-directory-table');

module.exports = moduleName;

angular.module(moduleName, [companyDirectoryTableModule])
	.component('tnCompanyDirectory', require('./company-directory.component'))
