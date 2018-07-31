'use strict';

var angular = require('angular');
require('angular-mocks');

var editProfileEmergency = require('./edit-profile-emergency.component');

describe('edit-profile-emergency component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'editProfileEmergency': 'editProfileEmergency',
		'emergencyContactTemplate': 'emergencyContactTemplate',
		'deferred': 'deferred',
		'$state': '$state',
		'form': {
			$invalid: true
		},
		'mockData': {
			data: {
				emergencyContacts: [
					{
						telephoneNumbers: {
							telephoneNumber1: '234234',
							primaryContactFlag: 'Y'
						}
					},
					{
						telephoneNumbers: {}
					}
				]
			},
			result: "result",
			err: {
				status: 404
			},
			emergencyContacts: [
				{
					telephoneNumbers: {
						telephoneNumber1: '234234',
						primaryContactFlag: 'Y'
					}
				},
				{
					telephoneNumbers: {}
				}
			]
		},
		data: {
			data: 'value',
			emergencyContacts: [{}, {}]
		},
		data1: [{}, {}],
		moduleName: 'app.main.edit-profile-emergency',
		mock$state: function () {
			return {
				go: function () {

				}
			}
		},
		mockGso: function () {
			return {
				getAppConfig: function () {
					return {}
				}
			};
		},
		mock$uibModal: function () {
			return {};
		},
		mockDSService: function () {
			return {}
		},
		editProfileEmergencyService: function () {
			return {
				_adjust: function () {
					return {
						emergencyContacts: [
							{
								telephoneNumbers: {
									telephoneNumber1: '234234',
									primaryContactFlag: 'Y'
								},
								primaryContactFlag: 'Y',
								name: {

								}
							},
							{
								telephoneNumbers: {}
							}
						]
					};
				}
			}
		},
		mockEditProfilePersonal: function () {
			return {}
		},
		emergencyContactTemplateConstant: {},
		locals: {}

	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('editProfileEmergency', obj.editProfileEmergencyService)
			.service('$state', obj.mock$state)
			.service('gso', obj.mockGso)
			.service('DS', obj.mockDSService)
			.service('editProfilePersonal', obj.mockEditProfilePersonal)
			.service('$uibModal', obj.mock$uibModal)
			.constant('emergencyContactTemplate', obj.emergencyContactTemplateConstant)
			.component('editProfileEmergency', editProfileEmergency);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function ($rootScope, _$componentController_, $q, _editProfileEmergency_, _emergencyContactTemplate_, $state, _gso_, _$uibModal_, _DS_) {
		obj['$scope'] = $rootScope.$new();
		obj['deferred'] = $q.defer();
		obj['$componentController'] = _$componentController_;
		obj['editProfileEmergency'] = _editProfileEmergency_;
		obj['emergencyContactTemplate'] = _emergencyContactTemplate_;
		obj['$state'] = $state;
		obj['gso'] = _gso_;
		obj['$uibModal'] = _$uibModal_;
		obj['DS'] = _DS_;
		obj['editProfileEmergency'].fetch = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['editProfileEmergency'].save = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['editProfileEmergency']._create = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['DS'].create = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj.locals = {
			$scope: obj['$scope'],
			editProfileEmergency: obj['editProfileEmergency'],
			$state: obj['$state'],
			emergencyContactTemplate: obj['emergencyContactTemplate']

		};

		obj['ctrl'] = obj['$componentController']('editProfileEmergency', obj.locals, null);
	}));

	it('editProfileEmergency fetch', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfileEmergency'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});

	it('editProfileEmergency fetch reject', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfileEmergency'].fetch).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData'].err);
		/*expect(obj['editProfileEmergency']._create).toHaveBeenCalled();
		 obj['deferred'].reject(obj['mockData']);*/
		obj['$scope'].$digest();
	});
	it('setPrimaryContact  function', function () {
		obj['ctrl'].$onInit();
		expect(obj['editProfileEmergency'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
		obj['ctrl'].setPrimaryContact({}, "Y");
	});
	it('updateContact  function', function () {
		obj['ctrl'].updateContact([], "", false, "");
	});
	it('addContact  function', function () {
		obj['ctrl'].data = {
			emergencyContacts: []
		};
		obj['ctrl'].addContact();
	});
	it('deleteContact  function', function () {
		obj['ctrl'].data = {
			emergencyContacts: [{}, {}]
		};
		obj['ctrl'].deleteContact([]);
	});
	it('cancel function', function () {
		obj['ctrl'].cancel({emergencyContactFormSection: {}});
	});
	it('save function', function () {
		obj['ctrl'].save(obj['form']);
		obj['$scope'].$digest();
	});

	it('editProfileEmergency save resolve', function () {
		obj['ctrl'].save({$invalid: false, emergencyContactFormSection: {$dirty: true}});
		expect(obj['DS'].create).toHaveBeenCalled();
		obj['deferred'].resolve(obj['data1']);
		obj['$scope'].$digest();
	});
	it('editProfileEmergency save reject', function () {
		obj['ctrl'].save({$invalid: false, emergencyContactFormSection: {$dirty: true}});
		//expect(obj['editProfileEmergency'].save).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();
	});

});
