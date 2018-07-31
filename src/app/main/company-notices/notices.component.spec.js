'use strict';

var angular = require('angular');
require('angular-mocks');
var notices = require('./notices.component');

var obj = {
	'$componentController': '$componentController',
	moduleName: 'app.main.company-notices',
	'ctrl': 'ctrl',
	'$scope': '$scope',
	'$stateParams': '$stateParams',
	 mock$stateParams: function () {
		return {
			id :"123"
		}
	},
	locals: {}

};

describe('Notices Component: Testing', function () {

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('$stateParams', obj.mock$stateParams)
			.component('comapnyNotices', notices);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, $stateParams) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;
		obj['$stateParams'] = $stateParams;
		obj.locals = {
			$scope: obj['$scope'],
			$stateParams: obj['$stateParams']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('comapnyNotices', obj.locals, null);
	}));

	describe('getBodyParseValue function testing', function () {
		it('test by passing an input called message', function () {
			obj['ctrl'].getBodyParseValue('message in to new line');
		});
	});
	describe('getPriority function testing', function () {
		it('test by passing an key and value same', function () {
			obj['ctrl'].getPriority('message', {priority: 'message'});
		});
		it('test by passing an key and value different', function () {
			obj['ctrl'].getPriority('message', {priority: 'messages'});
		});
	});
});
