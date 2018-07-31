'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.settings.proxy';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('proxy', require('./proxy.service'))
    .service('EmployeeDirectory', require('./employee-directory.service'))
    .service('ProxyDelete', require('./proxyDelete.service'))
    .service('relationService', require('./employee-relations.service'));
