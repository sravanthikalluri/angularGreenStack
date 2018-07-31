'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var nextHolidayCard = require('./next-holiday-card.component');

describe('nextHolidayCard component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso': 'gso',
		'deferred': 'deferred',
		'mockData': {
			"companyHolidayDetails": [
				{
					"id": "1",
					"schedule": "TRI",
					"date": "2016-01-01",
					"desc": "New Years Day",
					"hours": 8,
					"up_coming": false,
					"isActive":true
				},
				{date:''},
				{dd:{hours:''}}
			]
		},
		moduleName: 'app.main.dashboard.next-holiday-card',
		mockDSService: function () {
			return {}
		},
		momentService:function(){
			return function(dateString) {
				return moment(dateString).fromNow();
			};
		},
		gsoService: function () {
			return {
				getUtilService: function () {
					return {
						toggleComponentPermissions: function () {},
						splitSubComponentsPermissions: function () {
							return [
								{
									name: 'profile',
									permission: {
										canEdit: false
									}
								}
							]
						},
						getCookie: function () {
							return {};
						}
					}
				}
			}
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('gso', obj.gsoService)
			.service('moment',obj.momentService)
			.component('nextHolidayCard', nextHolidayCard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _gso_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['gso'] = _gso_;
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['gso'].getAppConfig = jasmine.createSpy().and.returnValue('');

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			gso: obj['gso'],
			moment:moment
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('nextHolidayCard', obj.locals, null);
	}));

	it('component should be initilize if', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData'])
		obj['$scope'].$digest();
	});
	it('component should be initilize else', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData'])
		obj['$scope'].$digest();
	});
	it('condition for date check', function() {
		obj['ctrl'].hasHolidayWidget = false;
		obj['deferred'].resolve(obj['mockData'])
		obj['$scope'].$digest();
	});
	it('condition for date check', function() {
		var hasHolidayWidget = false;
		obj['ctrl'].hasHolidayWidget = false;
		obj['deferred'].reject(obj['mockData'])
		obj['$scope'].$digest();
	});
});

