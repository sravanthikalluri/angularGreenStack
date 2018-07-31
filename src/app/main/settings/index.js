'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings';

var preferenceModule = require('./preferences-card');
var securityModule = require('./security-card');
var proxiesModule = require('./proxies-card');
var rolesModule = require('./roles-card');



module.exports = moduleName;

angular.module(moduleName, [preferenceModule,securityModule,proxiesModule,rolesModule])
	.component('settings', require('./settings.component'));
