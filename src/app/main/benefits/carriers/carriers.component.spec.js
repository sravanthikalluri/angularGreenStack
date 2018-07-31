'use strict';

var angular = require('angular');
require('angular-mocks');

var carriers = require('./carriers.component');

describe('benefit-options', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var timeout;
	var deferred;
	var $uibModal;
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
		var moduleName = 'app.main.benefits.carriers';

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
			.service('gso', mockGsoService)
			.service('DS', mockDSService)
			.component('carriers', carriers);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _$timeout_, _DS_, _gso_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		gso = _gso_;
		timeout = _$timeout_;


		var locals = {
			$scope: $scope,
			$timeout: timeout,
			gso: gso,
			DS: DS
		};

		ctrl = $componentController('carriers', locals ,null);
	}));

	it('should test $timeout', inject(function ($timeout) {
		$timeout.flush();
	}));

	it('$onInit function test ', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

/*
	describe('showCarriers  function test ', function () {
		it('showCarriers function call', function () {
			var carrier = {
				resourceName: 'Aflac'
			};
			ctrl.showCarriers(carrier);
		})
	});

	describe('setResourceItem  function test ', function () {
		it('setResourceItem function call', function () {
			ctrl.setResourceItem(0);
		})
	});

	describe('closeAll function test ', function () {
		it('closeAll  function call', function () {
			ctrl.closeAll();
		})
	});
*/

});

