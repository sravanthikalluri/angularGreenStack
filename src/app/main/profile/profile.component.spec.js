'use strict';

var angular = require('angular');
require('angular-mocks');

var profile = require('./profile.component');

describe('contact component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'$stateParams': '$stateParams',
		'gso': 'gso',
		'sharedProperties': 'sharedProperties',
		'deferred': 'deferred',
		'mockData': {
			data: {
				data: {
					address: {
						address1: '',
						city: ''
					}
				}
			}
		},
		moduleName: 'app.main.profile',
		mockDSService: function () {
			return {}
		},
		$stateParamsService: function () {
			return [];
		},
		gsoService: function () {
			return {
				getUtilService: function () {
					return {
						toggleComponentPermissions: function () {},
						splitSubComponentsPermissions: function () {
							return [
								{
									name: 'profile',
									permission: {
										canEdit: false
									}
								}
							]
						}
					}
				}
			}
		},
		sharedPropertiesService: function () {
			return {
				getComponentEmpMenuPermissions: function () { return true; },
				getComponentSelectedMenuPermissions: function () {
					return [
						{
							name: 'profile',
							permission: {
								canEdit: false
							}
						}
					]
				},
				getComponentPermissions: function () { return []; },
				setComponentSelectedMenuPermissions: function () { return []; }
			}
		},
		SharedDataService: function () {
			return {
				getAppSharedData: function () {
					return {}
				}
			}
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('$stateParams', obj.$stateParamsService)
			.service('gso', obj.gsoService)
			.service('sharedProperties', obj.sharedPropertiesService)
			.service('SharedDataService', obj.SharedDataService)
			.component('profile', profile);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _$stateParams_, _gso_, _sharedProperties_, _SharedDataService_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['$stateParams'] = _$stateParams_;
		obj['gso'] = _gso_;
		obj['sharedProperties'] = _sharedProperties_;
		obj['SharedDataService'] = _SharedDataService_;

		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			$stateParams: obj['$stateParams'],
			gso: obj['gso'],
			sharedProperties: obj['sharedProperties'],
			SharedDataService: obj['SharedDataService']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('profile', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['$stateParams'].response = {};
		obj['ctrl'].$onInit();
		obj['ctrl'].canEdit('profile');
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
	});
});

