'use strict';

var angular = require('angular');
var moduleName = 'app.main.company-directory.company-directory-table';
var companyDirectoryModalModule = require('./company-directory-modal');

module.exports = moduleName;

angular.module(moduleName, [companyDirectoryModalModule])
	.component('tnCompanyDirectoryTable', require('./company-directory-table.component'))
