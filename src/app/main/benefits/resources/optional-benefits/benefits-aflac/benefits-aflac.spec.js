'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsAflac = require('./benefits-aflac.component');

describe('benefits-aflac component', function (){
	var obj={
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso' : 'gso',
		'$location':'$location',
		'deferred':'deferred',

		moduleName: 'app.main.benefits.resources.optional-benfits.benefits-aflac',

		locals: {},
		mockDSService: function () {
			return {}
		},
		gsoMockService:function(){
			return {
				getAppConfig:function(){
					return {
						peoId : "abc",

					}
				}
			}
		},
		mock$location:function(){}
	};


	beforeEach(function() {

		angular
			.module(obj.moduleName, [])
			.service('DS', obj['mockDSService'])
			.service('gso', obj['gsoMockService'])
			.service('$location',obj['mock$location'])
			.component('benefitsAflac', benefitsAflac);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_,_DS_, _gso_, _$location_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['$location'] = _$location_;
		obj['gso'] = _gso_;
		obj['DS'] = _DS_;

		obj['DS'].find=jasmine.createSpy('benefits-guide-book','').and.returnValue(obj['deferred'].promise);

		obj.locals = {
			$scope: obj['$scope'],
			gso: obj['gso'],
			DS: obj['DS'],
			$location: obj['$location']
		};
		obj['ctrl'] = obj['$componentController']('benefitsAflac', obj.locals ,null);
	}));

/*	it('onInit function test', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(handbookData);
		$scope.$digest();
	});*/

/*	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		var response = {
			"data":"data"
		};
		obj['deferred'].resolve(response);
		obj['$scope'].$digest();
	});

	it('ctrl variables should be with mock data objects and exception', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		var err = {
			"data":"data"
		};
		obj['deferred'].reject(err);
		obj['$scope'].$digest();
	});*/
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
