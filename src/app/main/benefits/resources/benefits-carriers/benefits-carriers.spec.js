'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsCarriers = require('./benefits-carriers.component');

describe('benefits-carriers component', function (){
	var obj={
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso': 'gso',
		'deferred': 'deferred',
		'mockData': {
			forms:{

			},
			benefitsSummaryPlan: {

			}
		},
		'errorData':{
			data:{
				_error: {message:"error"}
			}
		},
		moduleName: 'app.main.benefits.resources.benefits-carriers',
		mockDSService: function () {
			return {}
		},
		mockGsoService: function()
		{
			return {}
		},

		locals: {}
	};


	beforeEach(function() {

		angular
			.module(obj.moduleName, [])
			.service('gso', obj.mockGsoService)
			.service('DS', obj.mockDSService)
			.component('benefitsCarriers', benefitsCarriers);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _gso_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;

		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);

		obj['gso'] = _gso_;
		obj['gso'].getAppConfig = jasmine.createSpy().and.returnValue('');

		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			gso: obj['gso']

		};

		obj['ctrl'] = obj['$componentController']('benefitsCarriers', obj.locals ,null);
	}));

	it('ctrl variables should be with mock data objects', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
	});

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].reject(obj['errorData']);
		obj['$scope'].$digest();
	});

});
