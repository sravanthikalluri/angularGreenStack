'use strict';

var angular = require('angular');
require('angular-mocks');
var moment = require('moment');
var editProfileWork = require('./edit-profile-work.component');

describe('edit-profile-work component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'editProfileWork': 'editProfileWork',
		'moment': 'moment',
		'nameTemplate': 'nameTemplate',
		'contactTemplate': 'contactTemplate',
		'$state': '$state',
		'deferred': 'deferred',
		'form': {
			primaryNameSectionForm: {
				$invalid: true
			}
		},
		'mockData': {
			result: "result"
		},
		moduleName: 'app.main.edit-profile.edit-profile-work',
		mock$state: function () {
			return {
				go: function () {

				}
			}
		},
		mockgsoService: function () {
			return {
				getAppConfig: function () {
					return {};
				}
			}
		},
		mock$uibModal: function () {

		},
		editProfileWorkService: function () {
			return {}
		},
		mockMomentService: function () {
			return function (dateString) {
				return moment(dateString);
			};
		},
		nameTemplateConstant: {},
		contactTemplateConstant: {},
		locals: {}

	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('editProfileWork', obj.editProfileWorkService)
			.service('$state', obj.mock$state)
			.service('moment', obj.mockMomentService)
			.service('gso', obj.mockgsoService)
			.service('$uibModal', obj.mock$uibModal)
			.constant('nameTemplate', obj.nameTemplateConstant)
			.constant('contactTemplate', obj.contactTemplateConstant)
			.component('editProfileWork', editProfileWork);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function ($rootScope, $q, _$componentController_, _editProfileWork_, _moment_, _gso_, _$uibModal_, $state, _nameTemplate_, _contactTemplate_) {
		obj['$scope'] = $rootScope.$new();
		obj['deferred'] = $q.defer();
		obj['$componentController'] = _$componentController_;
		obj['editProfileWork'] = _editProfileWork_;
		obj['moment'] = _moment_;
		obj['gso'] = _gso_;
		obj['$uibModal'] = _$uibModal_;
		obj['$state'] = $state;
		obj['nameTemplate'] = _nameTemplate_;
		obj['contactTemplate'] = _contactTemplate_;
		obj['editProfileWork'].fetch = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['editProfileWork'].save = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj.locals = {
			$scope: obj['$scope'],
			editProfileWork: obj['editProfileWork'],
			moment: obj['moment'],
			$state: obj['$state'],
			nameTemplate: obj['nameTemplate'],
			contactTemplate: obj['contactTemplate']
		};

		obj['ctrl'] = obj['$componentController']('editProfileWork', obj.locals, null);
	}));

	it('editProfileWork fetch resolve', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfileWork'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});
	it('editProfileWork fetch reject', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfileWork'].fetch).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();

	});
	it('updatePrimaryName function', function () {
		obj['ctrl'].data = {
			primary: []
		};
		obj['ctrl'].updatePrimaryName("hi", "hello");

	});
	it('updatePreferredName function', function () {
		obj['ctrl'].data = {
			preferred: []
		};
		obj['ctrl'].updatePreferredName("hi", "hello");

	});
	it('addContact function', function () {
		obj['ctrl'].data = {
			primary: [],
			preferred: [],
			contacts: []
		};
		obj['ctrl'].addContact("hi");


	});
	it('updateContact function', function () {
		obj['ctrl'].data = {
			contacts: []
		};
		obj['ctrl'].updateContact([], "prop", false);


	});
	it('deleteContact function', function () {
		obj['ctrl'].data = {
			contacts: []
		};
		obj['ctrl'].deleteContact([]);

	});

	it('save function', function () {
		obj['ctrl'].save(obj['form']);
		obj['$scope'].$digest();
	});

	it('editProfileWork save resolve', function () {
		obj['ctrl'].save({primaryNameSectionForm: {$invalid: false}, contactSectionForm: {}, preferredNameSectionForm: {}});
		//expect(obj['editProfileWork'].save).toHaveBeenCalledWith(undefined, {$invalid: false});
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
	});
	it('editProfileWork save reject', function () {
		obj['ctrl'].save({primaryNameSectionForm: {$invalid: false}, contactSectionForm: {}, preferredNameSectionForm: {}});
		expect(obj['editProfileWork'].save).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();
	});


});
