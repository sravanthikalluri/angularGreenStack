'use strict';

var angular = require('angular');
require('angular-mocks');

var timeOffCard = require('./time-off-card.component');

describe('timeOffCard component', function () {
	var obj;
	obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'LeaveType': 'LeaveType',
		'Requests': 'Requests',
		'deferred': 'deferred',
		'mockData': [
			{accrued:12}
			],
			data:[
				{
					leaveRequestSummary: {
						leaveTypeDesc: ''
					}
				}
			],
		moduleName: 'app.main.dashboard.time-off-card',
		mockDSService: function () {
			return {}
		},
		LeaveTypeMockService: function () {
			return [];
		},
		RequestsMockService: function () {
			return [];
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('LeaveType', obj.LeaveTypeMockService)
			.service('Requests', obj.RequestsMockService)
			.component('timeOffCard', timeOffCard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q, _LeaveType_, _Requests_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['LeaveType'] = _LeaveType_;
		obj['Requests'] = _Requests_;
		obj['deferred'] = $q.defer();

		obj['LeaveType'].findAll = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['Requests'].findAll = jasmine.createSpy().and.returnValue(obj['deferred'].promise);

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			LeaveType: obj['LeaveType'],
			Requests: obj['Requests']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('timeOffCard', obj.locals, null);
	}));
	it('should be initialized with time-off-card component', function() {
		obj['ctrl'].$onInit();
		expect(obj['LeaveType'].findAll).toHaveBeenCalled();
		obj['deferred'].resolve(obj['data']);
		obj['$scope'].$digest();
	});


	it('should be initialized with time-off-card else part', function() {
		obj['ctrl'].$onInit();
		expect(obj['LeaveType'].findAll).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockdata']);
		obj['$scope'].$digest();
	});

	it('should be initialized with time-off-card component', function() {
		obj['ctrl'].$onInit();
		expect(obj['Requests'].findAll).toHaveBeenCalled();
		obj['deferred'].resolve(obj['data']);
		obj['$scope'].$digest();
	});

	it('should be initialized with time-off-card else part', function() {
		obj['ctrl'].$onInit();
		expect(obj['Requests'].findAll).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockdata']);
		obj['$scope'].$digest();
	});

	it('should launch time moff',function () {
		obj['ctrl'].$onInit();
	})
});

