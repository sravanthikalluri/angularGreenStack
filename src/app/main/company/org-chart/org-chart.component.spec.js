'use strict';

var angular = require('angular');
require('angular-mocks');

var orgChart = require('./org-chart.component');

describe('org-chart component', function (){
	var ctrl;
	var $scope;
	var deferred;
	var OrgChartDataService;
	var DS;
	var $state;
	var $uibModal;
	var chartResults = {
		"data": {
			"managers": [{
				"EmpID": "123657878",
				"colleagues": "colleagues",
			}],
			"org-chat":[
				{
					"deptId":"dept1"
				}
			],
			"departmentHeads":[
				{
					"depthead":"dept1"
				}
			]
		}
	};

	beforeEach(function() {
		var mockOrgChartDataService=function() {
			return {};
		}
		var mockDSService=function() {
			return {};
		};
		var mock$state = function () {
			return {
				go: function () {

				}
			}
		};
		var mock$uibModal = function () {
			return {}
		};
		var moduleName = 'app.main.company.org-chart';

		angular
			.module(moduleName, [])
			.service('OrgChartDataService',mockOrgChartDataService)
			.service('DS',mockDSService)
			.service('$state', mock$state)
			.service('$uibModal', mock$uibModal)
			.component('orgChart', orgChart);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope,$componentController,$q,_OrgChartDataService_,_DS_,_$state_, _$uibModal_){
		$scope = $rootScope.$new();
		OrgChartDataService=_OrgChartDataService_;
		DS=_DS_;
		$state=_$state_;
		$uibModal=_$uibModal_;

		deferred = $q.defer();
		OrgChartDataService.fetchOrgChartByEmployeeID = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			OrgChartDataService:OrgChartDataService,
			DS:DS,
			$state:$state
		};

		ctrl = $componentController('orgChart', locals ,null);
	}));
	it('should initilize the component',function() {
		ctrl.$onInit();
		var uniqueObj=[{
			"manager":[{
				"relation":"prox"
			}]
		}];
		var employeeId="0012458";
		ctrl.getPageData(employeeId);
		ctrl.profileView();
		expect(OrgChartDataService.fetchOrgChartByEmployeeID).toHaveBeenCalled();
		deferred.resolve(chartResults);
		$scope.$digest();

	});
	it('should show error in no empID',function() {
		ctrl.$onInit();
		var errorData = {
			data:{
				_statusText: {message:"error"}
			}
		}
		expect(OrgChartDataService.fetchOrgChartByEmployeeID).toHaveBeenCalled();
		deferred.reject(errorData);
		$scope.$digest();
	});


	it('should navigate to profile page',function() {
		var empId="0012458";
		ctrl.profileView(empId);
		/*$window.sessionStorage.getItem=function() {
			return {
				"empId":"000023658"
			}
		}
		var empID = $window.sessionStorage.getItem('empId');*/

	});
	it('should display page data',function(){
		/*chartResults.data.managers.length*/
		ctrl.getPageData();
		expect(OrgChartDataService.fetchOrgChartByEmployeeID).toHaveBeenCalled();
		deferred.resolve(chartResults);
		$scope.$digest();
	});
	it('should display page data',function(){
		ctrl.getDepartmentData();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(chartResults);
		$scope.$digest();
	});
	it('should display error if there is no page data',function(){
		ctrl.getDepartmentData();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		};
		deferred.reject(errorData)
		$scope.$digest();
	});


	it('should assign current user details',function(){
		var employees={
			"1":"name1",
			"2":"name2"
		};
		var id=1;
		//ctrl.setCurrentUserDetails();
	});


});
