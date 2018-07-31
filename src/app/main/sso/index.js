'use strict';

var angular = require('angular');
var moduleName = 'app.main.tn-sso';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnSso', require('./tn-sso.component'))
	.directive('ssowidget', require('./sso-widget.directive'))
	.service('ssoArtifactsService', require('./sso-artifacts.service'));
