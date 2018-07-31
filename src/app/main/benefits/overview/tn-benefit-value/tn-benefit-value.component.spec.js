'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitValue= require('./tn-benefit-value.component');

describe('tn-benefit-value component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',

		moduleName: 'app.main.benefits.legal-notice.tn-benefit-value',


		locals: {}
	};


	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.component('tnBenefitValue', tnBenefitValue);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;








		obj.locals = {
			$scope: obj['$scope'],


		};


		obj['ctrl'] = obj['$componentController']('tnBenefitValue', obj.locals, null);
	}));




});


