'use strict';

var angular = require('angular');
require('angular-mocks');

var tnComboBox = require('./tn-combo-box.component');

describe('tn-combo-box component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-combo-box',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnComboBox', tnComboBox);

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
		obj['ctrl'] = obj['$componentController']('tnComboBox', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {
		obj['ctrl'].data=[
			{"name":"value"},
			{}
		];
		obj['ctrl'].selectedObject={}
		obj['ctrl'].$onInit();
	});
	it('change year function ', function() {
		obj['ctrl'].onChange=function(){};
		obj['ctrl'].changeYear();
	});

});

