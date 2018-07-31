'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.preferences-card.shared';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.constant('prefTypeMap', require('./pref-type-map.constant'))
	.constant('w2LabelMap', require('./w2-label-map.constant'))
	.constant('htmlTextMap', require('./html-text-map.constant'));
