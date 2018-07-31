'use strict';

var angular = require('angular');
require('angular-mocks');
var w4DateSelect = require('./w4-date-select.component');

describe('w4-date-select component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'$filter':'$filter',
		moduleName: 'app.main.money.taxes.w4-card.w4-date-select',
		locals: {}
	};
	var mockEffectiveDateFilter = jasmine.createSpy('effectiveDateFilter');
	/*beforeEach(module(function($provide) {
		$provide.value('effectiveDateFilter', mockEffectiveDateFilter);
	}));*/
	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('w4DateSelect', w4DateSelect);

		angular.mock.module(obj.moduleName, function ($provide) {
			$provide.value('effectiveDateFilter', mockEffectiveDateFilter);
		});

	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('w4DateSelect', obj.locals, null);
	}));
	it('onInit function', function () {
		obj['ctrl'].$onInit();
	});
	it('update function', function () {
		obj['ctrl'].onUpdate=function(){};
		obj['ctrl'].update("foo");
	});

	it('format function', function() {

		obj['ctrl'].format(new Date().toDateString());
		mockEffectiveDateFilter.and.callFake(function (data, chunks) {
			// Ignore chunks since that's what the test expects.
			return data;
		});
		expect(mockEffectiveDateFilter).toHaveBeenCalled();
	});
});

