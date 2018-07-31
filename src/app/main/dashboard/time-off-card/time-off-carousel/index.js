'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.time-off-card.time-off-carousel';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('timeOffCarousel', require('./time-off-carousel.component'));
