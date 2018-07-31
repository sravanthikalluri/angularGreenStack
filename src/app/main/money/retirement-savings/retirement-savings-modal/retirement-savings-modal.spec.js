'use strict';

var angular = require('angular');
require('angular-mocks');

var retirementSavingsModal = require('./retirement-savings-modal.component');

describe('retirement-savings-modal component', function () {

	var ctrl;
	var $scope;
	var DS;
	var deferred;
	var $filter;
	var moment;
	var results = {

	};
	var formName={
		"$valid":"true"
	};

	beforeEach(function () {
		var moduleName = 'app.main.company.retirement-savings-modal';


		var mockDSService = function () {
			return {}
		};
		var mock$filter=function() {
			return {};
		};

		var gso = function () {
			return {
				getAppConfig: function () {
					return {
						userId: 1234,
						companyId: 'IEF'
					}
				}
			};
		};

		var mockMomentService=function() {
			return function () {
				return {
					year: function () {
						return new Date().getFullYear()
					}
				}
			};
		};

		var SharedDataService = function () {
			return {
				getAppSharedData: function () {
					return {};
				}
			};
		};

		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('$filter',mock$filter)
			.service('gso',gso)
			.service('moment',mockMomentService)
			.service('SharedDataService',SharedDataService)
			.component('retirementSavingsModal', retirementSavingsModal);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, $componentController, $q, _DS_) {
		$scope = $rootScope.$new();
		DS = _DS_;

		deferred = $q.defer();
		DS.update = jasmine.createSpy().and.returnValue(deferred.promise);
		var locals = {
			$scope: $scope,
			DS: DS,
			$filter:$filter,
		};

		ctrl = $componentController('retirementSavingsModal', locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		localStorage.getItem=function() {
			var isSetGoal="true";
			return isSetGoal;
		};
		localStorage.getItem=function() {
			var setGoalAmount="true";
			return setGoalAmount;
		};
		ctrl.data=[{
			"PreTax":[{
				"federalAmount":""
			},],
			contributions: [
				{
					details: {
						goalAmount: 12
					}
				}
			]
		}];
		ctrl.savingsData={
			"PreTax":[{
				"federalAmount":""
			},]
		}
		;

		ctrl.$onInit();
	});
	it('else', function () {
		localStorage.getItem=function() {
			var isSetGoal="false";
			return isSetGoal;
		};
		localStorage.getItem=function() {
			var setPriorAmoun="true";
			return setPriorAmoun;
		};
		ctrl.data=[{
			"PreTax":[{
				"federalAmount":""
			},],
			contributions: [
				{
					details: {
						goalAmount: 12
					}
				}
			]
		}];
		ctrl.savingsData={
			"PreTax":[{
				"federalAmount":""
			},]
		};
		ctrl.$onInit();
	});
	it('should close the modal',function() {
		ctrl.closeModal();
	});
	it('should set the goal amount',function() {
		ctrl.goalChangeFn(100);
	});
	it('should set the prior amount',function(){
		ctrl.data=[{
			"PreTax":[{
				"federalAmount":""
			},],
			contributions: [
				{
					details: {
						goalAmount: 12
					}
				}
			]
		}];
		ctrl.savingsData={
			"PreTax":[{
				"federalAmount":""
			},]
		};
		ctrl.priorChangeFn(10);
	});
	it('should save the changes',function() {
		ctrl.data =
			{
				contributions: [
					{
						details: {
							goalAmount: 12
						}
					}
				]
			};
		ctrl.savingsData={
			"PreTax":[{
				"federalAmount":""
			},],
			"employeeId":""


		};
		ctrl.selectedType ='goal';
		ctrl.saveMethod(formName);
		expect(DS.update).toHaveBeenCalled();
		deferred.resolve(ctrl.savingsData);
		$scope.$digest();
	});
	it('should save the changes and set if selectedtype is not goal',function() {
		ctrl.data =
			{
				contributions: [
					{
						details: {
							goalAmount: 12
						}
					}
				]
			};

		ctrl.savingsData={
			"PreTax":[{
				"federalAmount":""
			},],
			"employeeId":""


		};
		ctrl.selectedType ='lll';
		ctrl.saveMethod(formName);
		expect(DS.update).toHaveBeenCalled();
		deferred.resolve(ctrl.savingsData);
		$scope.$digest();
	});
	it('should go to else case if formname is invalid',function() {
		ctrl.data=[{
			"PreTax":[{
				"federalAmount":""
			},],
			contributions: [
				{
					details: {
						goalAmount: 12
					}
				}
			]
		}];
		ctrl.savingsData={
			"PreTax":[{
				"federalAmount":""
			},],
			"employeeId":""


		};

		ctrl.saveMethod(formName);

	});
	it('should show error message',function() {
		ctrl.data=[{
			"PreTax":[{
				"federalAmount":""
			},]
		}];
		ctrl.savingsData={
			"PreTax":[{
				"federalAmount":""
			},],
			"employeeId":""


		};
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		ctrl.saveMethod(formName);
		expect(DS.update).toHaveBeenCalled();
		deferred.reject(errorData);
		$scope.$digest();
	});

});
