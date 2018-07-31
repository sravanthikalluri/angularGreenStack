'use strict';

var angular = require('angular');
require('angular-mocks');

var timeOffCarousel = require('./time-off-carousel.component');

describe('timeOffCarousel component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'deferred': 'deferred',
		moduleName: 'app.main.dashboard.time-off-card.time-off-carousel',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('timeOffCarousel', timeOffCarousel);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['deferred'] = $q.defer();
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};
		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('timeOffCarousel', obj.locals, null);
	}));

	it('shoul initiliz the controller',function(){
		obj['ctrl'].$onInit();
	})

	it('should return a number',function(){
		var hours = 14.6;
		expect(obj['ctrl'].leaveHours(hours)).toEqual(Math.floor(hours));
	})

	it('should return a 0',function(){
		var hours = '';
		expect(obj['ctrl'].leaveHours(hours)).toEqual(0);
	})
});

