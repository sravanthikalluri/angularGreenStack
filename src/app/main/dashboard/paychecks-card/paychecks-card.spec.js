'use strict';
var angular = require('angular');
require('angular-mocks');
var paychecksCard = require('./paychecks-card.component');
describe('paychecks-card component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var PaycheckDataService;
	var deferred;
	var result =
		{
			"checkSummaries": [
				{
					"id":"0"
				},
				{
					"id":"1"
				}
			],

		};
	var SharedDataServiceMockService = function () {
		return {
			getAppSharedData: function () {
				return {}
			}
		}
	};
	beforeEach(function() {
		var moduleName = 'app.main.dashboard.paychecks-card';
		var mockDSService = function(){ return {}};
		var gsoService = function(){ return {}};
		var PaycheckMockDataService = function(){ return {}};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('gso',gsoService)
			.service('PaycheckDataService',PaycheckMockDataService)
			.service('SharedDataService',SharedDataServiceMockService)
			.component('paychecksCard', paychecksCard);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_,_gso_,_PaycheckDataService_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		gso = _gso_;
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');
		PaycheckDataService =_PaycheckDataService_;
		PaycheckDataService.fetchAllPaychecksWithDetails = jasmine.createSpy().and.returnValue(deferred.promise);
		PaycheckDataService.fetchAllPaycheckDetails = jasmine.createSpy().and.returnValue(deferred.promise);
		var locals = {
			$scope: $scope,
			DS: DS,
			gso:gso,
			PaycheckDataService:PaycheckDataService
		};
		ctrl = $componentController('paychecksCard', locals ,null);
	}));

	it('component should be initilize with data', function() {
		ctrl.$onInit();
		expect(PaycheckDataService.fetchAllPaychecksWithDetails).toHaveBeenCalled();
		//expect(PaycheckDataService.fetchAllPaycheckDetails).toHaveBeenCalled();

		deferred.resolve(result);
		$scope.$digest();
	});
	it('component should be initilize', function() {
		ctrl.$onInit();
		var res={
			"_error":"error",
			"checkSummaries": [
				{
					"id":"0"
				},
				{
					"id":"1"
				}
			],
		};
		expect(PaycheckDataService.fetchAllPaychecksWithDetails).toHaveBeenCalled();
		//expect(PaycheckDataService.fetchAllPaycheckDetails).toHaveBeenCalled();

		deferred.resolve(res);
		$scope.$digest();
	});

	it('calling DS.Find method', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(result);
		$scope.$digest();
	});
	it('calling catch DS.Find method', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var err = {};
		deferred.reject(err);
		$scope.$digest();
	});

	it('should test window open event', inject(function( $timeout ) {
		$timeout.flush();
	}));
});
