'use strict';

var angular = require('angular');
var overviewModule = require('./overview');
var fsaCalculatorModule = require('./fsa-calculator');
var legalNoticeModule = require('./legal-notice');
var resourcesModule = require('./resources');
var acaMarketPlace = require('./aca-marketplace');
var carriers = require('./carriers');
var aleSelection = require('./ALE-selection');
var healthAndCounseling = require('./health-and-counseling');
var moduleName = 'app.main.benefits';

module.exports = moduleName;

angular
	.module(moduleName, [
		overviewModule,
		fsaCalculatorModule,
		resourcesModule,
		legalNoticeModule,
		acaMarketPlace,
		carriers,
		aleSelection,
		healthAndCounseling

	]);
