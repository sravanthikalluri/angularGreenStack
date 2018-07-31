'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.security-card.secret-question-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('secretQuestionModal', require('./secret-question-modal.component'));
