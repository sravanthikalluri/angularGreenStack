'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyDirectoryTableController = require('./company-directory-table.component');

describe('company-directory-table component', function () {

	var ctrl;
	var $scope;
	var DS;
	var deferred;
	var $state;
	var results = {
		"table_data": {
			"empLst": [
				{
					"emp1": "emp1",
					emplymntStatus: 'A'
				},
				{
					"emp2": "emp2",
					emplymntStatus: 'A'
				}
			]
		},
		"department": [
			{
				"location": "HYD"
			},
			{
				"location": "TN"
			}
		],
		"companyLocation":[
			{
				"location":"HYD",
			},
			{

				"location":"UK"
			}
		],
		"company_directory":[
			{

			}
		],
		data: {
			employees: []
		}
	};

	beforeEach(function () {
		var moduleName = 'app.main.company.company-directory-table';

		var mockgsoService = function () {
			return {
				getAppConfig: function () {
					return {};
				}
			}
		};

		var mockDSService = function () {
			return {}
		};

		var mock$state = function () {
			return {
				transitionTo: function () {

				}
			}
		};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('gso', mockgsoService)
			.service('$state', mock$state)
			.component('tnCompanyDirectoryTableController', tnCompanyDirectoryTableController);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, $componentController, $q, _DS_, $state, $filter) {
		$scope = $rootScope.$new();
		DS = _DS_;
		// $state = _$state_;
		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS: DS,
			$state: $state,
			$filter: $filter
		};

		ctrl = $componentController('tnCompanyDirectoryTableController', locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {

		ctrl.$onInit();
		/*ctrl.allEmployeeFinished = false;
		ctrl.isShowingTerminated=false;
		ctrl.locationsFinished=true;
		ctrl.departmentsFinished=true;
		ctrl.employeeFinished=false;*/
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
	});
	it('should throw error', function () {

		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		deferred.reject(errorData);
		$scope.$digest();
	});

	it('should show employees details if total length not equal to allData', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();

		ctrl.showMore();

	});
	it('should show employees details if total length  equal to allData', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
		ctrl.showMore();
	});


	it('should open a modal', function () {
		ctrl.openModal();
	});

	it('should terminate if isShowingTerminated true', function () {
		ctrl.searchBoxData={
			"value":"true"
		};
		ctrl.isShowingTerminated = function() {
			return true;
		};
		//ctrl.showAllEmps();
	});
	it('searches the filter if isShowTerminated is false',function() {
		ctrl.searchBoxData = {
			value: 'sdfdshbhf'
		};
		ctrl.isShowingTerminated=false;
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
		ctrl.searchFilter();
	});
	it('searches the filter  if isShowTerminated is true',function() {
		ctrl.searchBoxData = {
			value: "dfdsfdsf"
		};
		ctrl.searchBoxData = {
			value: {
				length :"2"
			}
		};
		ctrl.isShowingTerminated=true;
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
		ctrl.searchFilter();
	});


	it('should filter the locations',function() {
		ctrl.globalActiveEmp=[];
		ctrl.filteredData=[];
		/*var loc=[{
			"locationName":""
		}];*/
		var loc="locCleared";
		var value=true;
		ctrl.filterLocationNames=[];
		 ctrl.filterDepartmentNames=['',''];
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
		ctrl.filterLocations(loc,value);
	});
	it('should filter the locations if value is false',function() {
		ctrl.globalActiveEmp=[];
		/*ctrl.filteredData=[];*/
		/*var loc=[{
			"locationName":""
		}];*/
		var loc="locCleared";
		var value=false;
		/*ctrl.filterLocationNames=[];
		ctrl.filterDepartmentNames=['',''];*/
		ctrl.filterLocations(loc,value);
	});
	it('should filter the departments',function() {
		ctrl.globalActiveEmp=[];
	/*	var dept=[{
			"deptName":""
		}];*/
	    var dept="deptCleared";
		var checked=true;
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
		ctrl.filterDepartments(dept,checked);
	});
	it('should filter the departments if value is false',function() {
		ctrl.globalActiveEmp=[];
	/*	var dept=[{
			"deptName":""
		}];*/
		var dept="deptCleared";
		var checked=false;
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
		ctrl.filterDepartments(dept,checked);
	});

	it('should sort Results',function () {
		var sortDirection='';
		ctrl.sortResults(sortDirection);
	});
	it('should Close filter',function () {
		ctrl.closeFilter();
	});
	it('should setQuery Params',function () {
		var nameFilter ="dsfdsf";
		ctrl.setQueryParams();
	});

});
