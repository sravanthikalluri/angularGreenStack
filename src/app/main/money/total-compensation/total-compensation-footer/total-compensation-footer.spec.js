var angular = require('angular');
require('angular-mocks');

var totalCompensationFooter = require('./total-compensation-footer.component');

describe('Total Compensation Footer Component',function(){
	var $scope;
	var ctrl;

	beforeEach(function(){

		var moduleName = 'app.main.money.total-compensation.total-compensation-footer';

		angular
			.module(moduleName, [])
			.component('totalCompensationFooter', totalCompensationFooter);

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
		ctrl = $componentController('totalCompensationFooter', locals, null);
	}));

	it('on init function call',function(){
		ctrl.$onInit();
	});
});
