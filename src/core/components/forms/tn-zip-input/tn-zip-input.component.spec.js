'use strict';

var angular = require('angular');
require('angular-mocks');

var tnZipInput = require('./tn-zip-input.component');

describe('tn-zip-input component', function() {
	var $scope;
	var ctrl;
	var formName={
		fieldName:{

		}}

	beforeEach(function() {

		var moduleName = 'trinet.core.components.forms';

		angular
			.module(moduleName, [])
			.component('tnZipInput', tnZipInput);

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
		ctrl = $componentController('tnZipInput', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.$onInit();
	});
	it('should $postLink function',function() {
		ctrl.formName = [{fieldName : ""}];
		ctrl.$postLink();
	});

	it('update function and length greater than 5', function () {
		ctrl.onUpdate=function(){};
		var data = "sdasdsd";
		ctrl.update(data);
	});
	it('update function and length less than 5', function () {
		ctrl.onUpdate=function(){};
		var data = "sd";
		ctrl.update(data);
	});


});
