'use strict';

var angular = require('angular');
require('angular-mocks');

var tnPaycheckDetailsCard = require('./tn-paycheck-details-card.component');

describe('tn-paycheck-details-card component', function() {
	var $scope;
	var ctrl;
	/*var paycheckDetails={
		summary:"hi"
	};*/
	beforeEach(function() {
		var moduleName = 'trinet.shared.components.tn-paycheck-details-card';

		angular
			.module(moduleName, [])
			.component('tnPaycheckDetailsCard', tnPaycheckDetailsCard);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function( $rootScope, $componentController) {
		var locals;
		var btnClick;
		$scope = $rootScope.$new();


		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
		};

		// Initialize Component Controller
		ctrl = $componentController('tnPaycheckDetailsCard', locals, null);
	}));


	it('paycheckdetailsSummary', function() {
		ctrl.paycheckDetails={
			summary: [
				{amount: 23}
			]
		};
		$scope.$digest();
			// expect(paycheckDetails.summary).toEqual("hi");
			// expect(paycheckDetails && paycheckDetails.summary).toBeTruthy(true);
		});


	it('button click function is defined', function() {

			expect(ctrl.btnClick).toBeDefined(true);
			ctrl.btnClick();
			expect(ctrl.showModal).toBeTruthy(true);
		});



	it('should show paycheck details card', function() {
		ctrl.$onInit();
		ctrl.$onChanges();

	});


});


