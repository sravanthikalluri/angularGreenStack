/**
 * Created by Sravani on 2/7/2017.
 */


'use strict';

var angular = require('angular');
require('angular-mocks');

var w4AmountSelect = require('./w4-amount-select.component');

describe('w4-amount-select component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
'data':{

},



		moduleName: 'trinet.main.benefits.w4-amount-select',
		locals: {}
	};

	beforeEach(function() {

		angular
			.module(obj.moduleName, [])

			.component('w4AmountSelect', w4AmountSelect);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {

		obj['$scope'] = $rootScope.$new();
		obj['$componentController']=$componentController;

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],

		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('w4AmountSelect', obj.locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
			obj['ctrl'].$onInit();


	});

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].onUpdate = function () {};
		obj['ctrl'].update(obj['data']);


	});
});



