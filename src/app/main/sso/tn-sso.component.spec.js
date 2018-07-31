
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnDashboardController = require('./tn-sso.component');

describe('tn-sso component', function () {
	var ctrl;
	var $scope;
	var $stateParams;
	var $window;
	beforeEach(function () {
		var moduleName = 'app.main.sso';
		var mock$stateParams = function () {
			return {};
		};
		var mock$window = function () {
			return {
				sessionStorage: {
					setItem: function (p1,p2) {
						
					}
				}
				};
		};
		angular
			.module(moduleName, [])
			.service('$stateParams',mock$stateParams)
			.service('$window',mock$window)
			.component('tnDashboardController', tnDashboardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_$stateParams_, _$window_) {
		$scope = $rootScope.$new();
		$stateParams=_$stateParams_;
			$window = _$window_;

		var locals = {
			$scope: $scope,
			$stateParams:$stateParams,
			$window:$window
		};
		ctrl = $componentController('tnDashboardController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
