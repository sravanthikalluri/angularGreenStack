'use strict';

var angular = require('angular');
require('angular-mocks');

var lastPaycheck = require('./last-paycheck.component');

describe('dashboard component', function () {
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
		moduleName: 'app.main.money.direct-deposit.last-paycheck',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('lastPaycheck', lastPaycheck);

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
		obj['ctrl'] = obj['$componentController']('lastPaycheck', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].paychecks = {
			"checkSummaries":[
				{"a":1},
				{"b":2},
			]
		}
		obj['ctrl'].lastPayCheckDetails = {};
		obj['ctrl'].$onInit();
	});
});

