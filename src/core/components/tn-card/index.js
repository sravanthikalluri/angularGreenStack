'use strict';

var angular = require('angular');
var tnCardTitleGroupModule = require('./tn-card-title-group');
var moduleName = 'trinet.core.components.tn-card';

module.exports = moduleName;

angular.module(moduleName, [tnCardTitleGroupModule])
	.component('tnCard', require('./tn-card.component'));
