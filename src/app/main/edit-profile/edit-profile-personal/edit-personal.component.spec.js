/**
 * Created by Sravani on 2/6/2017.
 */
'use strict';

var angular = require('angular');
require('angular-mocks');

var editProfilePersonal = require('./edit-profile-personal.component');

describe('edit personal component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'editProfilePersonal': 'editProfilePersonal',
		'deferred': 'deferred',
		'$state': '$state',
		'form': {
			$invalid: true,
			homeAddressSectionForm: {},
			personalIdSectionForm: {},
			personalstatusSectionForm: {}
		},
		'mockData': {
			address: {},
			selected: {},
			dropdown: {},
			personalInfo: {}
		},
		mock$state: function () {
			return {
				go: function () {
					//return app.main.money.paychecks-and-statements;
				}
			}
		},

		mockDSService: function () {
			return {}
		},

		mockeditProfilePersonalService: function () {
			return {
				/*homeAddressSectionForm : {
					$dirty :{

					}
				}*/
			}
		},
		mockGso: function () {
			return {
				getAppConfig: function () {
					return {};
				}
			}
		},
		mock$uibModal: function () {
			return {
				open:function () {
					return{
						modal:{
							result:''
						}
					}
				}
			}
		},
		moduleName: 'app.main.edit-profile.edit-profile-personal',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('$state', obj.mock$state)
			.service('gso', obj.mockGso)
			.service('$uibModal', obj.mock$uibModal)
			.service('editProfilePersonal', obj.mockeditProfilePersonalService)
			.component('editProfilePersonal', editProfilePersonal);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _editProfilePersonal_, $state, _gso_, _$uibModal_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['editProfilePersonal'] = _editProfilePersonal_;
		obj['$state'] = $state;
		obj['gso'] = _gso_;
		obj['$uibModal'] = _$uibModal_;
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['editProfilePersonal'].fetch = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['editProfilePersonal'].save = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			editProfilePersonal: obj['editProfilePersonal'],
			$state: obj['$state']

		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('editProfilePersonal', obj.locals, null);
	}));


	it('editProfilePersoanl fetch resolve', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfilePersonal'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});
	it('editProfilePersonal fetch reject', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfilePersonal'].fetch).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();

	});

	it('updateAddress function', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfilePersonal'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
		obj['ctrl'].updateAddress("country", "US");
		/*	obj['ctrl'].handleCountryChange('CA');*/

	});
	it('updateAddress function', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfilePersonal'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
		obj['ctrl'].updateAddress("country", "US");
		obj['ctrl'].updateAddress("hai", "country");
		/*	obj['ctrl'].handleCountryChange('US');*/

	});

	it('updatePersonalId function', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfilePersonal'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
		obj['ctrl'].updateAddress("country", "US");
		obj['ctrl'].updatePersonalId("country", "hello");

	});
	it('updatePersonalStatus function', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfilePersonal'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
		obj['ctrl'].updateAddress("country", "US");
		obj['ctrl'].updatePersonalStatus("country", "hello");
	});

	it('save function', function () {
		obj['ctrl'].save(obj['form']);
		obj['$scope'].$digest();
	});

	it('editProfilePersonal save resolve', function () {
		obj['ctrl'].save(obj['form']);
		expect(obj['editProfilePersonal'].save).toHaveBeenCalledWith(undefined, obj['form']);
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
	});
	it('editProfilePersonal save reject', function () {
		obj['ctrl'].save(obj['form']);
		expect(obj['editProfilePersonal'].save).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();
	});

	it('should prompt', function() {
		obj['ctrl'].prompt();
	});
	it('should goToView',function() {
		obj['ctrl'].goToView();
	});
	it('should cancel',function() {
		var editProfilePersonalForm ={};
		obj['ctrl'].cancel(editProfilePersonalForm);
	})
});

