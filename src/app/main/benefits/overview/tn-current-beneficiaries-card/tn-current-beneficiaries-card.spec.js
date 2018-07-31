'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCurrentBeneficiariesCard = require('./tn-current-beneficiaries-card.component');

describe('tn-current-beneficiaries-card component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',

		moduleName: 'trinet.main.benefits.tn-current-beneficiaries-card',


		locals: {}
	};


	beforeEach(function() {

		angular
			.module(obj.moduleName, [])
			.component('tnCurrentBeneficiariesCard',tnCurrentBeneficiariesCard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;
		obj.locals = {
			$scope: obj['$scope'],

		};

		obj['ctrl'] = obj['$componentController']('tnCurrentBeneficiariesCard', obj.locals, null);
	}));

	it('should initilize the controller',function() {
		obj['ctrl'].$onInit();

	});

	it('should log after timeout', inject(function ($timeout) {
		$timeout.flush();


	}));

});

