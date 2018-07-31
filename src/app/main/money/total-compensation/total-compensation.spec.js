var angular = require('angular');
require('angular-mocks');

var totalCompensation = require('./total-compensation.component');

describe('Total Compensation Component',function(){
	var $scope;
	var ctrl;

	beforeEach(function(){

		var moduleName = 'app.main.money.total-compensation';

		angular
			.module(moduleName, [])
			.component('totalCompensation', totalCompensation);

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
		ctrl = $componentController('totalCompensation', locals, null);
	}));

	it('on init function call',function(){
		ctrl.$onInit();
	});
});
