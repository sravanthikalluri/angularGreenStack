'use strict';

var angular = require('angular');
var moduleName = 'app.core.components.tn-card.tn-card-title-group';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnCardTitleGroup', require('./tn-card-title-group.component'));
