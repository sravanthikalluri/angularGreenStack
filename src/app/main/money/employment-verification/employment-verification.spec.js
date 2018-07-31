var angular = require('angular');
require('angular-mocks');

var employmentVerification = require('./employment-verification.component');

describe('Employment Verification Component',function(){
	var $scope;
	var ctrl;
	var DS;
	var deferred;
	var mockData = {};

	beforeEach(function(){
		var mockDSService = function(){
			return {};
		};
		var mockgsoService = function () {
			return {
				getAppConfig: function () {
					return {
						peoId: 'AMBS'
					}
				}
			}
		};

		var moduleName = 'app.main.money.employment-verification';

		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('gso', mockgsoService)
			.component('employmentVerification', employmentVerification);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q,$rootScope, $componentController, _DS_) {
		var locals;

		$scope = $rootScope.$new();
		DS = _DS_;

		// Stub the service functions
		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DS: DS
		};

		// Initialize Component Controller
		ctrl = $componentController('employmentVerification', locals, null);
	}));

	it('on init function call',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});
	it('on init function call',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject(mockData);
		$scope.$digest();
	});
});
