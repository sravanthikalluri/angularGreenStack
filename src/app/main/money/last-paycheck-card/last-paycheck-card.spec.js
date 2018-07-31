var angular = require('angular');
require('angular-mocks');

var lastPayCheck = require('./last-paycheck-card.component');

describe('Last Paycheck Card Component',function(){
	var $scope;
	var ctrl;
	var PaycheckDataService;
	var deferred;
	var mockData = {_error:true
	};

	var data = [{name:'lastPaycheck'},{name:'lastPaycheck'}];

	beforeEach(function(){
		var mockPaycheckDataService = function(){
			return {};
		};

		var moduleName = 'app.main.money.last-paycheck-card';

		angular
			.module(moduleName, [])
			.service('PaycheckDataService', mockPaycheckDataService)
			.component('lastPayCheck', lastPayCheck);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q,$rootScope, $componentController, _PaycheckDataService_) {
		var locals;

		$scope = $rootScope.$new();
		PaycheckDataService = _PaycheckDataService_;

		// Stub the service functions
		deferred = $q.defer();
		PaycheckDataService.fetchAllPaychecksWithDetails = jasmine.createSpy().and.returnValue(deferred.promise);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			PaycheckDataService: PaycheckDataService
		};

		// Initialize Component Controller
		ctrl = $componentController('lastPayCheck', locals, null);
	}));

	it('on init function call',function(){
		ctrl.$onInit();
		expect(PaycheckDataService.fetchAllPaychecksWithDetails).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

	it('btnClick function call',function(){
		ctrl.btnClick();
	});
});
