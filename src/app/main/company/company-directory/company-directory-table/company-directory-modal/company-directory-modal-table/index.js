'use strict';

var angular = require('angular');
var moduleName = 'app.main.company-directory.company-directory-Modal.company-directory-modal-table';


module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnCompanyDirectoryModalTable', require('./company-directory-modal-table.component'))
