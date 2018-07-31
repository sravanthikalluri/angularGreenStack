var angular = require('angular');
require('angular-mocks');

var directDeposit = require('./direct-deposit.component');

describe('Direct Deposit Component',function(){
	var $scope;
	var DirectDepositDataService;
	var ctrl;
	var deferred;
	var $filter;
	var mockData = {
				accounts : {_error:'Error'},
				paychecks : {_error:'Error'}
		};

	beforeEach(function(){
		var mockDirectDepositService = function(){
			return {};
		};

		var moduleName = 'app.main.money.direct-deposit';
		var mockSharedDataServiceService = function () {
			return {
				getAppSharedData: function () {
					return {}
				}
			}
		};
		angular
			.module(moduleName, [])
			.service('DirectDepositDataService', mockDirectDepositService)
			.service('SharedDataService', mockSharedDataServiceService)
			.component('directDeposit', directDeposit);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q,$rootScope, $componentController, _DirectDepositDataService_,$filter) {
		var locals;
		$rootScope.emit = function () {}
		$scope = $rootScope.$new();
		DirectDepositDataService = _DirectDepositDataService_;
		$filter = $filter;

		// Stub the service functions
		deferred = $q.defer();
		DirectDepositDataService.fetchAllDirectDepositAccountsWithDetails = jasmine.createSpy().and.returnValue(deferred.promise);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DirectDepositDataService: DirectDepositDataService
		};

		// Initialize Component Controller
		ctrl = $componentController('directDeposit', locals, null);
	}));

	it('on init function call',function(){
		ctrl.$onInit();
		expect(DirectDepositDataService.fetchAllDirectDepositAccountsWithDetails).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

	it('addAccount function testing',function(){
		ctrl.addAccount();
	});
});
