'use strict';

var angular = require('angular');
require('angular-mocks');

var statesBuildDataView = require('./states-build-data-view.component');

describe('states-build-data-view component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'num':'num',

		moduleName:  'trinet.main.benefits.states-build-data-view',
		locals: {}
	};


	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.component('statesBuildDataView', statesBuildDataView);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {

		obj['$scope'] = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: $scope,

		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('statesBuildDataView',obj.locals, null);
	}));


});


