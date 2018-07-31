
'use strict';

var angular = require('angular');
require('angular-mocks');

var publicProfile = require('./public-profile.component');

describe('public-profile component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'stringUtil': 'stringUtil',
		'DS': 'DS',
		'$stateParams': '$stateParams',
		'deferred': 'deferred',

		'mockData': {
			employeeDetails: {
				employeeDetails: {
					'preferredName': 'fgfdg krishna ',
					address: {
						"address1": "address1",
						"city": "city",
						"state": "state",
						"postalCode": "postalCode"
					}
				}

			},
		},

		'mockData1': {

			employeeDetails: {
				'employeeName':'sdsd   hhghh',
				employeeDetails: {

					address: {
						"address1": "address1",
						"city": "city",
						"state": "state",
						"postalCode": "postalCode"
					}
				},

			},
		},


		moduleName: 'app.main.profile',
		stringUtilService: function () {
			return function () {
				return function () {
				}

			}
		},
		mockDSService: function () {
			return {}
		},
		$stateParamsService: function () {
			return [];
		},
		$stateService: function () {
			return {
				transitionTo: function () {
					return {};
				}
			}
		},
		locals: {}

	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])

			.service('DS', obj.mockDSService)
			.service('$stateParams', obj.$stateParamsService)
			.service('$state', obj.$stateService)
			.service('stringUtil', obj.stringUtilService)

			.component('publicProfile', publicProfile);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, _stringUtil_, _DS_, _$stateParams_, $q) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['stringUtil'] = _stringUtil_;
		obj['DS'] = _DS_;
		obj['$stateParams'] = _$stateParams_;
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		// Set up our dependencies to be injected into $componentController
		obj['stringUtil'].join = jasmine.createSpy().and.returnValue('');
		obj.locals = {
			$scope: obj['$scope'],
			stringUtil: obj['stringUtil'],
			$stateParams: obj['$stateParams'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('publicProfile', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['$stateParams'].id = 23;
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();


	});
	it('ctrl variables should be initialized ', function () {
		obj['$stateParams'].id = 24;
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData1']);
		obj['$scope'].$digest();


	});



	it('getFullAddressHtml  function', inject(function () {

		obj['ctrl'].getFullAddressHtml(obj['mockData']);


	}));
	it('getFullAddressHtml  function', inject(function () {

		obj['ctrl'].getFullAddressHtml(obj[!'mockData']);


	}));

});



