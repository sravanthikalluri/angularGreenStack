'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.combo-box';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('ComboBoxService', require('./combo-box.service'));
