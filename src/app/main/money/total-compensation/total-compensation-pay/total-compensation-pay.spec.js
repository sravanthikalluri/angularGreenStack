var angular = require('angular');
require('angular-mocks');

var totalCompensationPay = require('./total-compensation-pay.component');

describe('Total Compensation Pay Component',function(){
	var $scope;
	var ctrl;

	beforeEach(function(){

		var moduleName = 'app.main.money.total-compensation.total-compensation-pay';

		angular
			.module(moduleName, [])
			.component('totalCompensationPay', totalCompensationPay);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;

		$scope = $rootScope.$new();


		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope
		};

		// Initialize Component Controller
		ctrl = $componentController('totalCompensationPay', locals, null);
	}));

	it('on init function call',function(){
		ctrl.$onInit();
	});
});
