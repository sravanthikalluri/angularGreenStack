'use strict';

var angular = require('angular');
require('angular-mocks');

var tnRolesCardController = require('./roles-card.component');

describe('rolesCard component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'roleService':'roleService',
		'gso': 'gso',
		'pGroup':'pGroup',
		'location':'location',
		'deferred': 'deferred',
		'deptId':'deptId',
		'mockData': {
			deptId: 234,
			data: [
				{
					isChecked: false
				}
			]
		},
		mockData1: {data:[
			{
				deptId: 123,
			}
		]},
		moduleName: 'app.main.settings.roles-card',
		mockDSService: function () {
			return {};
		},
		mockRolesService: function () {
			return {
				fetchDepartmentData:function () {
					return[

					]
				},
				fetchPayGroupsData: function () {
					return {};
				},
				addCheckedRolesFromCheckedList: function () {
					return [
						{role: "EPHRS"}
					]
				}
			};
		},
		gsoService: function () {
			return {
				getUtilService: function () {

				},
				getAppConfig : function () {
					return {
				      userId : ''
				        }
				}
			}
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('roleService', obj.mockRolesService)
			.service('gso', obj.gsoService)
			.component('tnRolesCardController', tnRolesCardController);


		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _gso_, _roleService_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['gso'] = _gso_;
		obj['roleService'] = _roleService_;
		obj['deferred'] = $q.defer();


		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			gso: obj['gso'],
			roleService: obj['roleService']
		};

		obj['DS'].update = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['roleService'].fetchDepartmentData = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['roleService'].fetchLocationData = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['roleService'].fetchAllRolesData = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['roleService'].fetchPayGroupsData = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['roleService'].fetchEmployeeRolesData = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('tnRolesCardController', obj.locals, {
			empRolesData :{

			}
		});
	}));

	it('should call the roleService fetchDepartmentData  and true condition',function () {
		var deptOBJ = {
			"deptCode": "All",
			"deptId": "All",
			"deptName": "All Departments",
			"shortDesc": "short"
		};
		obj['ctrl'].empRolesData = [{}],
		obj['ctrl'].$onInit();
		expect(obj['roleService'].fetchDepartmentData).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData1']);
		obj['$scope'].$digest();
		expect(obj['roleService'].fetchEmployeeRolesData).toHaveBeenCalled();
	     var results = {
	     	data : {
				isChecked :'',
				Id: ''
			}
		 };
		obj['deferred'].resolve(results);
		obj['$scope'].$digest();
		expect(obj['roleService'].fetchPayGroupsData).toHaveBeenCalled();
		obj['deferred'].resolve(results);
		obj['$scope'].$digest();
	});


	it('should call the roleService fetchDepartmentData and else data',function () {
		obj['ctrl'].$onInit();
		expect(obj['roleService'].fetchDepartmentData).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();
		expect(obj['roleService'].fetchPayGroupsData).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();
	});

	it('should closeAlert',function () {

		obj['ctrl'].closeAlert();
	});
	it('should ShowHide',function () {

		obj['ctrl'].ShowHide();
	});

	it('should showAssignRoles',function () {

		obj['ctrl'].showAssignRoles();
	});

	it('should initilize the componet of rolesCard',function () {
		obj['ctrl'].departments = [];
		obj['ctrl'].filterDept();
	});
	it('should filter the location of rolesCard',function () {
          obj['location'] = {

		  }
		obj['ctrl'].filterLocation(obj['location']);
	});

	it('should initilize the componet of rolesCard',function () {
		obj['pGroup'] = {

		}
		obj['ctrl'].filterPayGroup (obj['pGroup']);
	});

	it('should save the componet of rolesCard and success',function () {
		obj['ctrl'].rolesData=[{
			isChecked : true
		}];
		obj['ctrl'].onSave();
	});
/*	it('should save the componet of rolesCard and success , deptId is not equal to null ',function () {

		obj['ctrl'].rolesData=[{
			isChecked : true,
			deptId : "ABC"
		}];
		obj['ctrl'].onSave();
		expect(obj['DS'].update).toHaveBeenCalled();
		var results = {
			data : {
				isChecked :'',
				Id: ''
			}
		};
		var err = {
			data : {}
		};
		obj['deferred'].resolve(results);
		obj['$scope'].$digest();
	});*/
	it('should save the componet of rolesCard and failure , deptId is not equal to null ',function () {

		obj['ctrl'].rolesData=[{
			isChecked : true,
			deptId : "ABC"
		}];
		obj['ctrl'].onSave();
		expect(obj['DS'].update).toHaveBeenCalled();
		var error = {
			data : {}
		}
		obj['deferred'].reject(error);
		obj['$scope'].$digest();
	});
});

