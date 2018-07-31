'use strict';

var angular = require('angular');
require('angular-mocks');

var settings = require('./settings.component');

describe('settings component', function () {
	var obj;
	obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'deferred': 'deferred',
		'gso':'gso',
		'DS':'DS',
		'sharedProperties':'sharedProperties',
		'SharedDataService':'SharedDataService',
		'mockData':[
			{
				"data": [{"key": "NA", "value": "Domestic Partner Adult"}]
			},

		],
		"obj":{
			"relationType":""
		},
		moduleName: 'app.main.settings',
		gsoMockService : function(){
			return{
				getUtilService : function(){
					return{
						splitSubComponentsPermissions:function(){
							return {}
						},
						toggleComponentPermissions : function () {
							return {}

						}
					}
				},
				getAppConfig: function () {
					return {};
				}
			}
		},
		sharedPropertiesMockService : function(){
			return{
				getWidgetInfo:function(){
					return{
						length:10
					}
				}
			}
		},

		mockDSservice : function () {
			return{

			}
		},

		mockSharedDataService: function () {
			return {
				getAppSharedData: function () {return {
					componentsPermissions : [{ }]
				}
				}
			}
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('gso', obj.gsoMockService)
			.service('sharedProperties', obj.sharedPropertiesMockService)
			.service('SharedDataService', obj.mockSharedDataService)
			.service('DS',obj.mockDSservice)
			.component('settings', settings);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q,_sharedProperties_,_gso_,_DS_, _SharedDataService_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['deferred'] = $q.defer();
		obj['sharedProperties'] = _sharedProperties_;
		obj['gso'] = _gso_;
		obj['DS'] = _DS_;
		obj['SharedDataService'] = _SharedDataService_;

		obj['DS'].find = jasmine.createSpy('permissions', '').and.returnValue(obj['deferred'].promise);
		obj['sharedProperties'].getComponentPermissions = jasmine.createSpy().and.returnValue(' ');
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			gso:obj['gso'],
			sharedProperties:obj['sharedProperties'],
			DS:obj['DS']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('settings', obj.locals, {
			componentsPermissions : false
		});
	}));

	/*it('ctrl variables should be initialized ', function () {
		obj['ctrl'].$onInit();
	});*/

	it('should variables should be initialized  and success',function(){
		obj['ctrl'].$onInit();
	// expect(obj['DS'].find).toHaveBeenCalled();
	 var response = {};
	 obj['deferred'].resolve(response);
	 obj['$scope'].$digest();
	 });

	it('should  variables should be initialized  and failure',function(){
		obj['ctrl'].$onInit();
	//	expect(obj['DS'].find).toHaveBeenCalled();
		var response = {};
		obj['deferred'].reject(response);
		obj['$scope'].$digest();
	});

});

