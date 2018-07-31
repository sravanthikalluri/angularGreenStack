'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProfileMenu = require('./tn-profile-menu.component');

describe('tn-profile-menu component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'$state':'$state',
		moduleName: 'trinet.core.components.tn-profile-menu',
		locals: {},
		mock$state : function () {
			return {
				go: function () {
					//return app.main.money.paychecks-and-statements;
				}
			}
		},
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('$state',obj.mock$state)
			.component('tnProfileMenu', tnProfileMenu);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_,$state) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['$state'] =$state;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			$state:obj['$state']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('tnProfileMenu', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {

	});


});

