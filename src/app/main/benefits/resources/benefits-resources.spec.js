'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsResources = require('./benefits-resources.component');

describe('benefits-resources component', function (){
	var obj={
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.benefits.resources.benefits-resources',
		mockGSOService: function () {
			return {
				getAppConfig: function () {
					return {
						peoId : "AMB"
					};
				}
			}
		},
		mockDSService: function () {
			return {};
		},
		mock$stateParamsService: function () {
			return {};
		},
		mockData: {
			planCarriersCtrldocMeta: [
				{
					title: 'Summary of Medical Plan Changes'
				}
			],
			planCarriersCtrlGeneral: []
		},
		locals: {}
	};



	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('gso', obj['mockGSOService'])
			.service('DS', obj['mockDSService'])
			.service('$stateParams', obj['mock$stateParamsService'])
			.component('benefitsResources', benefitsResources);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, _DS_, _gso_, _$stateParams_, $q){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['gso'] = _gso_;
		obj['$stateParams'] = _$stateParams_;
		obj.locals = {
			$scope: obj['$scope'],
		};
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['ctrl'] = obj['$componentController']('benefitsResources', obj.locals ,null);
	}));

	it('ctrl variables should be with mock data objects', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);obj['$scope'].$digest();
	});

	it( 'should test window open event and true value', function() {
		obj['ctrl'].resourcesItems = [{isOpen : "true" }];
		obj['ctrl'].setResourceItem(0);
		obj['ctrl'].closeAll();
	});
	it( 'should test window open event and false value', function() {
		obj['ctrl'].setResourceItem(0);
		obj['ctrl'].closeAll();
	});
	it( 'should test window open event', function() {
		obj['ctrl'].closeAll();
	});

	it('should openWin', function(){
		var url = "/dfd "
		obj['ctrl'].openWin(url);
	})


});
