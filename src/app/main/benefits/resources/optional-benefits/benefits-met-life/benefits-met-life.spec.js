'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsMetLife = require('./benefits-met-life.component');

describe('benefits-met-life component', function (){
	var obj={
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso':'gso',
		'deferred': 'deferred',
		'modalInstance': 'modalInstance',
		'mockData': {
			benefitsGuideBook:{
				quater:{}
			}
		},
		moduleName: 'app.main.benefits.resources.optional-benefits.benefits-met-life',
		mockDSService: function () {
			return {}
		},
		gsoMockService:function(){
			return {
				getAppConfig:function(){
					return {}
				}
			}
		},
		locals: {}
	};

	beforeEach(function() {
		var moduleName = 'app.main.benefits.resources.optional-benefits.benefits-met-life';

		var mockDSService = function(){ return {}};

		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('gso', obj.gsoMockService)
			.component('benefitsMetLife', benefitsMetLife);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, $location, _gso_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['gso'] = _gso_;

		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);

		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			gso: obj['gso']
		};

		obj['ctrl'] = obj['$componentController']('benefitsMetLife', obj.locals ,null);
	}));

	it('ctrl variables should be with mock data objects', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
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
