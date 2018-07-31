
'use strict';

var angular = require('angular');
require('angular-mocks');

var executive = require('./executive.component');

describe('executive component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var deferred;
	beforeEach(function() {
		var moduleName = 'app.main.benefits.resources.additional-resources-benefits-summary-view-executive';


		var mockDSService = function(){ return {}};

		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.component('executive', executive);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, _DS_,$q){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		deferred = $q.defer();

		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		var locals = {
			$scope: $scope,
			DS: DS,
		};
		ctrl = $componentController('executive', locals ,{
			resolve:{
				modalData:''
			},
			modalInstance:{
				dismiss:function() {
					return {};
				},
				close:function() {
					return {};
				}
			}
		});
	}));
	it('should initilize the component',function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});
	it('should able to catch exceptions',function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject({});
		$scope.$digest();
	});
	it('should able to fetch the data, assign playType as custom',function() {
		ctrl.fetchData('','','cop');
		expect(ctrl.planType).toEqual('custom');
	});
	it('should able to fetch the data, assign playType as all',function() {
		ctrl.fetchData('','','soap');
	});
	it('should close the modal',function() {
		ctrl.closeModal();
	});
	it('should print the documents',function() {
		 var prtContent = " ";
		ctrl.printSection();
	});

});

