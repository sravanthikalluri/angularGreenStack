'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitCard = require('./tn-benefit-card.component');

describe('tn-benefit-card component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',

		moduleName: 'app.main.benefits.legal-notice.tn-benefit-card',


		locals: {}
	};




	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.component('tnBenefitCard', tnBenefitCard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;
		obj.locals = {
			$scope: obj['$scope'],

		};

		obj['ctrl'] = obj['$componentController']('tnBenefitCard', obj.locals, null);
	}));

	it('should initilize the controller',function() {
		obj['ctrl'].$onInit();

	});



	it('should log after timeout', inject(function ($timeout) {
		$timeout.flush();


	}));
});

