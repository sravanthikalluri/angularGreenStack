'use strict';

var angular = require('angular');
require('angular-mocks');

var tnAddressInput = require('./tn-address-input.component');

describe('tn-address-input component', function() {
	var $scope;
	var ctrl;
	var formName={
		fieldName:{

		}}

	beforeEach(function() {

		var moduleName = 'trinet.core.components.forms';

		angular
			.module(moduleName, [])
			.component('tnAddressInput', tnAddressInput);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
		};

		// Initialize Component Controller
		ctrl = $componentController('tnAddressInput', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.$onInit();
	});
	it('should $postLink function',function() {
		ctrl.formName = [{fieldName : ""}];
		ctrl.$postLink();
	});
	it('update function', function () {
		ctrl.onUpdate=function(){}
		ctrl.update("");
	});

});
