'use strict';

var angular = require('angular');
require('angular-mocks');


var tnSelect = require('./tn-select.component');
describe('tnSelect', function () {
	var $scope;
	var ctrl;
	var filter;
	var formName = {
		fieldName: {}
	};

	beforeEach(function () {
		var mockFilter = function () {
			return function () {
				return function () {

				}
			}
		};

		var moduleName = 'trinet.core.components.forms';

		angular
			.module(moduleName, [])
			.service('filter', mockFilter)
			.component('tnSelect', tnSelect);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, _filter_) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			filter: _filter_
		};

		// Initialize Component Controller
		ctrl = $componentController('tnSelect', locals, null);
		ctrl.items = [
			{
				value: 'asdf',
				stringLimit: 9
			}
		];
		ctrl.stringLimit = 9;
		ctrl.formName = {
			jk: 'value'
		};
		ctrl.fieldName = 'jk'
	}));
	it('should initilize the controller', function () {
		ctrl.$onInit();
	});

	it('should $postLink function',function() {
		ctrl.formName = [{fieldName : ""}];
		ctrl.$postLink();
	});
	it('should setEllipsedSelectOptions', function () {
		ctrl.setEllipsedSelectOptions();

	});
	it('should setFullSelectOptions', function () {
		ctrl.setFullSelectOptions();
	});


	it('update function', function () {
		ctrl.onUpdate = function () {}
		ctrl.update("");
	});


});
