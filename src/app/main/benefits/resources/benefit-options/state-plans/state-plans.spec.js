'use strict';

var angular = require('angular');
require('angular-mocks');

var statePlans = require('./state-plans.component');

describe('statePlans', function (){
	var obj={
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso': 'gso',
		'sharedProperties': 'sharedProperties',
		'deferred': 'deferred',
		'modalInstance':'modalInstance',
		'mockData': {
			benefitsSummaryViewPlans: {

			},
			statePlanData:
				{

				}

		},
		'mockData1': {
			benefitsSummaryViewPlans: {

			}
		},
		'errorData':{
			data:{
				_error: {message:"error"}
			}
		},
		moduleName: 'app.main.benefits.resources.benefit-options.state-plans',
		mockDSService: function () {
			return {}
		},
		mockGsoService: function()
		{
			return {}
		},
		sharedPropertiesService: function () {
			return {}

		},
		locals: {}
	};


	beforeEach(function() {

		angular
			.module(obj.moduleName, [])
			.service('gso', obj.mockGsoService)
			.service('DS', obj.mockDSService)
			.service('sharedProperties',obj.sharedPropertiesService)
			.component('statePlans', statePlans);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _gso_,_sharedProperties_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['sharedProperties'] = _sharedProperties_;

		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);

		obj['gso'] = _gso_;
		obj['gso'].getAppConfig = jasmine.createSpy().and.returnValue('');
		obj['sharedProperties'].getStringValue = jasmine.createSpy().and.returnValue('');


		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			gso: obj['gso'],
			sharedProperties: obj['sharedProperties']
		};

		obj['ctrl'] = obj['$componentController']('statePlans', obj.locals ,null);
	}));

	it('ctrl variables should be with mock data objects', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});

	it('ctrl variables should be with mock data objects', function() {
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
	it('should close the modal when called', function () {
		obj['ctrl'].modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),
			dismiss: jasmine.createSpy('modalInstance.dismiss')
		};
		obj['ctrl'].closeModal();
		expect(obj['ctrl'].modalInstance.dismiss).toHaveBeenCalledWith('cancel');
		expect(obj['ctrl'].modalInstance.close).toHaveBeenCalledWith('cancel');
	});

});
