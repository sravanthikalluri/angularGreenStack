'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.state-specific-forms';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('stateSpecificForms', require('./state-specific-forms.component'))
