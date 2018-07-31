'use strict';

var angular = require('angular');
require('angular-mocks');

var tnNewAccountSecondaryContainer = require('./secondary-container.component');

describe('tnNewAccountSecondaryContainer component', function () {
	var obj;
	obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'deferred': 'deferred',
		'mockData': {
			data: {
				length:""
			}
		},
		moduleName: 'app.main.money.direct-deposit.new-account.secondary-container',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnNewAccountSecondaryContainer', tnNewAccountSecondaryContainer);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['deferred'] = $q.defer();
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('tnNewAccountSecondaryContainer', obj.locals, null);
	}));
});

