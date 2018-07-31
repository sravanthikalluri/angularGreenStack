
'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.legal-notices';
module.exports = moduleName;

angular.module(moduleName, [])
	.component('legalNotices', require('./legal-notices.component'));
