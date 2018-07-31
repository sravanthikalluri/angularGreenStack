'use strict';

var angular = require('angular');
require('angular-mocks');

var dashboard = require('./dashboard.component');

describe('dashboard component', function () {
	var obj, deferred;
	obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'deferred': 'deferred',
		'gso':'gso',
		'sharedProperties':'sharedProperties',
		'mockData': {
			data: {
				length:""
			}
		},
		moduleName: 'app.main.dashboard',
		gsoMockService : function(){
			return{
				getUtilService : function(){
					return{
						checkIfWidgetExists:function(){
							return{

							}
						}
					}
				}
			}
		},
		DSMockService: function () {
			return {
				find : function () {
					return {}
				}
			};
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
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('gso', obj.gsoMockService)
			.service('DS', obj.DSMockService)
			.service('sharedProperties', obj.sharedPropertiesMockService)
			.component('dashboard', dashboard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q,_sharedProperties_,_gso_, _DS_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['deferred'] = $q.defer();
		obj['sharedProperties'] = _sharedProperties_;
		obj['gso'] = _gso_;
		obj['DS'] = _DS_;
		deferred = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(deferred.promise);
		obj['sharedProperties'].getWidgetInfo = jasmine.createSpy().and.returnValue([{}, {}]);
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			gso:obj['gso'],
			sharedProperties:obj['sharedProperties']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('dashboard', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		deferred.resolve(obj['mockData']);
	});

	it('should execute loadWidget method',function(){
		obj['ctrl'].$onInit();
		expect(obj['sharedProperties'].getWidgetInfo).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		expect(obj['DS'].find).toHaveBeenCalled();
		deferred.resolve(obj['mockData']);
		obj['$scope'].$digest();
	});
});

