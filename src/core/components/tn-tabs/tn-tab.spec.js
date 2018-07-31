'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTab = require('./tn-tab.component');

describe('tn-tab component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-tab',
		locals: {},
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnTab', tnTab);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('tnTab', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {
		obj['ctrl'].tabs={
			addTab:function(){}
		}
		obj['ctrl'].$onInit();
	});

});

