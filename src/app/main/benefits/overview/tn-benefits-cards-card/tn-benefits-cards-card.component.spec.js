'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitsCardsCard = require('./tn-benefits-cards-card.component');

describe('tn-benefits-cards-card component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',

		moduleName: 'app.main.benefits.legal-notice.tn-benefits-cards-card',


		locals: {}
	};


	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.component('tnBenefitsCardsCard', tnBenefitsCardsCard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;








		obj.locals = {
			$scope: obj['$scope'],


		};


		obj['ctrl'] = obj['$componentController']('tnBenefitsCardsCard', obj.locals, null);
	}));



	it('should initilize the controller',function() {
		obj['ctrl'].$onInit();

	});




	it('should log after timeout', inject(function ($timeout) {
		$timeout.flush();

	/*	expect(console.log).toHaveBeenCalledWith('mycomponent after timeout');*/
	}));


});

