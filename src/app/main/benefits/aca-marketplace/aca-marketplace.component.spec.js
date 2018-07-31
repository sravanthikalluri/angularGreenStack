'use strict';

var angular = require('angular');
require('angular-mocks');

var acaMarketPlace = require('./aca-marketplace.component');

describe('acaMarketPlace component ', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var deferred;
	var mockData = {
		data: [
			{
				employmentInfo: {
					regularTemporary: {}
				}
			}
		]
	};


	beforeEach(function() {
		var moduleName = 'app.main.benefits.aca-marketplace';

		var mock$timeoutService = function(){ };
		var mockGsoService = function(){ return {
			getAppConfig: function () {
				return {
					peoId: 'AMB'
				}
			}

		}};
		var mockDSService = function(){ return {}};
		var mockUIBModalService = function(){ return {}};

		angular
			.module(moduleName, [])
			.service('$timeout', mock$timeoutService)
			.service('gso', mockGsoService)
			.service('DS', mockDSService)
			.component('acaMarketPlace', acaMarketPlace);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _$timeout_, _DS_, _gso_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		gso = _gso_;

		var locals = {
			$scope: $scope,
			gso: gso,
			DS: DS
		};

		ctrl = $componentController('acaMarketPlace', locals ,null);
	}));

	it('$onInit function test ', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

	it('printSection function test ', function ($compile) {

		ctrl.printSection();
		var ele = '<div id="acaMarketPlace"></div>';
		$compile(ele);
		$scope.$digest();
	});
});

