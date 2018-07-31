'use strict';

var angular = require('angular');
require('angular-mocks');

var findEmployeeModal = require('./find-employee-modal.component');

describe('find-employee-modal component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var deferred;

	var mockData = {
		"employees": [{
			"id":"10",
			"ename":"person1"
		},
			{
				"id":"20",
				"ename":"person2"
			}
		],
		"eforms_data":[{
			"formPath" : "terms-condition"
		},
			{
				"formPath" : "terms-and-condition"
			}],
		"companyHolidayDetails":[{
			"selectedYear" : "2-02-2017"
		},
			{
				"selectedYear" : "08-08-2017"
			}],

	};
	beforeEach(function() {
		var moduleName = 'trinet.main.company.find-employee-modal';


		var mockDSService = function(){ return {}};
		angular
			.module(moduleName, [])

			.service('DS', mockDSService)
			.component('findEmployeeModal', findEmployeeModal);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);


		var locals = {
			$scope: $scope,
			DS: DS,
		};

		ctrl = $componentController('findEmployeeModal', locals ,null);
	}));
	it('should initilize the componet',function() {
	/*	ctrl.$onInit();*/
		ctrl.departmentService();
		var employees= {
			table_data: {
				facets: {
					departments: []
				}
			}
		};
		ctrl.searchText = "sfdsf";
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(employees)
		$scope.$digest();
	});

	it('should reject the service',function() {
		ctrl.$onInit();
		ctrl.departmentService();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		};
		deferred.reject(errorData)
		$scope.$digest();
	});

	it('should initilize the componet',function() {
		ctrl.compileSearchData();
		var employees= {
			table_data: {
				facets: {
					departments: []
				}
			}
		};
		ctrl.searchText = "sfdsf";
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(employees)
		$scope.$digest();
	});

	it('should reject the service',function() {
		ctrl.compileSearchData ();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		};
		deferred.reject(errorData)
		$scope.$digest();
	});
	it('should clear the data',function() {
		ctrl.resolve = {
			data: {
				departmentData: function () {
					return {};
				}
			}
		};
		ctrl.clear();
	});

	it('should search the given name',function() {
		ctrl.departmentService=function() {

		}

		var dep="department";
		ctrl.selected="department";
		ctrl.onSearchClicked();
		//expect(ctrl.selected).toBe(dep);
	});
	it('should search the given name',function() {
	/*	ctrl.departmentService=function() {

		}

		var dep="location";*/
		ctrl.selected="location";
		ctrl.onSearchClicked();
		//expect(ctrl.selected).toBe(dep);
	});

	it('should clear the data',function() {
		ctrl.resolve = {
			data: {
				departmentData: function () {
					return {};
				}
			}
		};
		ctrl.onDepartmentClicked = function () {

		};

		ctrl.onClick();
	});
	it('should return desired department',function() {
		ctrl.onEmployeeClicked = function () {

		};
		ctrl.resolve = {
			data: {
				departmentData: function () {
					return {};
				},
				pageData: function () {
					return {};
				}
			}
		};
		$scope.onNameClick();
	});
	it('department service method',function() {
		ctrl.departmentService();
	});
	it('should cancel the modal',function () {
		ctrl.modalInstance=
			{
				dismiss: function(){

				}
			}
					ctrl.onCancel();
	});
	it('should be clear Search',function () {
		ctrl.clearSearch();
	});
	it('should be clear Search',function () {
		ctrl.searchText = "dfsfsd";
		ctrl.clearSearch();
	});
	it('should clear All',function () {
		ctrl.clearAll();
	});
	it('should clearText',function () {
		var item = ctrl.selected;

		ctrl.clearText(item);
	});
	it('should clear All',function () {
		var text = "";
		ctrl.shiftDeptEmployee(text);
	});
	it('should filterDepartment',function () {
		ctrl.filterDepartment ();
	});

});
