'use strict';

var angular = require('angular');
require('angular-mocks');

var rolesData = require('./roles-data.service');

describe('roles-data component', function() {
	var $scope;
	var ctrl;
	var $filter;
	var DS;
	var saveDeffered;
	var svc = {};


	beforeEach(function() {

		var moduleName = 'app.main.settings.roles-card.shared';
		var mock$filter = function () {
			return {
			}
		};
		var mockDSService = function () {
			return {
			}
		};

		angular
			.module(moduleName, [])
			.service('$filter', mock$filter)
			.service('DS',mockDSService)
			.service('rolesData', rolesData);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $q,$componentController,_$filter_,_DS_) {
		var locals;
		$scope = $rootScope.$new();
		DS=_DS_;
		saveDeffered = $q.defer();
		$filter = _$filter_;
		// Set up our dependencies to be injected into $componentController

		DS.find = jasmine.createSpy('roles','').and.returnValue(saveDeffered.promise);
		DS.find = jasmine.createSpy('EmployeeRoles','').and.returnValue(saveDeffered.promise);
		svc.fetchAllRolesData = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchEmployeeRolesData = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchDepartmentData = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.fetchLocationData= jasmine.createSpy().and.returnValue(saveDeffered.promise);
		svc.addCheckedRolesFromCheckedList = jasmine.createSpy().and.returnValue(saveDeffered.promise);

		// Initialize Component Controller
	}));
	it('should initilize the variables',inject(function(rolesData) {
		var fetchAllRolesData = function() {

		};
		rolesData.fetchAllRolesData();
		var fetchEmployeeRolesData = function() {

		};
		rolesData.fetchEmployeeRolesData();
		var fetchDepartmentData = function() {

		};
		rolesData.fetchDepartmentData();
		var fetchLocationData = function() {

		};
		rolesData.fetchLocationData();
		var fetchPayGroupsData = function() {

		};
		rolesData.fetchPayGroupsData();
		var role1 = [{
			role:'',
			deptId:'',
			location:''
		}]
		var checkedRoles = [{
			role:'',
			deptId:'',
			location:''
		}];
		rolesData.addCheckedRolesFromCheckedList(checkedRoles,role1);
	}));
});
