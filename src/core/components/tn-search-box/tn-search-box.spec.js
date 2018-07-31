'use strict';

var angular = require('angular');
require('angular-mocks');

var tnSearchBox = require('./tn-search-box.component');

describe('tn-search-box component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-search-box',
		locals: {},
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnSearchBox', tnSearchBox);

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
		obj['ctrl'] = obj['$componentController']('tnSearchBox', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {
		obj['ctrl'].action=function(){}
			obj['ctrl'].change();
	});


});

