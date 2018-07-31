var angular = require('angular');
require('angular-mocks');

var totalCompensationBenefits = require('./total-compensation-benefits.component');

describe('Total Compensation Benefits Component',function(){
	var $scope;
	var ctrl;

	beforeEach(function(){

		var moduleName = 'app.main.money.total-compensation.total-compensation-benefits';

		angular
			.module(moduleName, [])
			.component('totalCompensationBenefits', totalCompensationBenefits);

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
		ctrl = $componentController('totalCompensationBenefits', locals, null);
	}));

	it('on init function call',function(){
		ctrl.$onInit();
	});
});
