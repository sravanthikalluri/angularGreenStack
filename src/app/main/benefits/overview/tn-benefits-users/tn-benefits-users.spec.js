'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitsUsers = require('./tn-benefits-users.component');

describe('tn-benefits-users component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',

		moduleName:'trinet.main.benefits.tn-benefits-users',


		locals: {}
	};

	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.component('tnBenefitsUsers', tnBenefitsUsers);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj.locals = {
			$scope: obj['$scope'],

		};

		obj['ctrl'] = obj['$componentController']('tnBenefitsUsers', obj.locals, null);
	}));



});

