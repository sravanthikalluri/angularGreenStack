'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-datepicker';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnDatepicker', require('./tn-datepicker.component'))
	.component('tnDatepickerModal', require('./tn-datepicker-modal/tn-datepicker-modal.component'));
