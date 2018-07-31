'use strict';

var angular = require('angular');
var moduleName = 'app.main.help.browserSupport';

module.exports = moduleName;

angular.module(moduleName,[])
	.component('browserSupport', require('./browserSupport.component'));
