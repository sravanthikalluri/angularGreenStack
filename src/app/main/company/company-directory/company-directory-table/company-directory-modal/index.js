'use strict';

var angular = require('angular');
var moduleName = 'app.main.company-directory.company-directory-Modal';
var companyDirectoryModalTable = require('./company-directory-modal-table');


module.exports = moduleName;

angular.module(moduleName, [companyDirectoryModalTable])
	.component('tnCompanyDirectoryModal', require('./company-directory-modal.component'))
