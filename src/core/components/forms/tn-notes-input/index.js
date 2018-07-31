'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.form.tn-notes-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnNotesInput', require('./tn-notes-input.component'));
