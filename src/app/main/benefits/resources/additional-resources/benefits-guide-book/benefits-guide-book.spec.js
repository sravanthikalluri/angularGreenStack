'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsGuideBook = require('./benefits-guide-book.component');

describe(' benefits-guide-book component', function () {




	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'$stateParams':'$stateParams',
		'mockData': {
			benefitsGuideBook: {
				canadian: false
			}
		},
		'mockData1': {
			benefitsGuideBook: {
				canadian: true
			}
		},
		'errorData': {
			data: {
				_error: {message: "error"}
			}
		},
		moduleName: 'app.main.benefits.overview.benefits-guide-book',
		mockDSService: function () {
			return {}
		},
		mockStateParams: function(){
			return {
				data:{}
			}
		},
		locals: {}
	};




	beforeEach(function () {




		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('$stateParams', obj.mockStateParams)

			.component('benefitsGuideBook', benefitsGuideBook);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_,_$stateParams_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['$stateParams'] = _$stateParams_;
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			$stateParams:obj['$stateParams']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('benefitsGuideBook', obj.locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});
	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData1']);
		obj['$scope'].$digest();

	});

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].reject(obj['errorData']);

		obj['$scope'].$digest();

	});


});
