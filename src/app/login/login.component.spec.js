
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnLoginController = require('./login.component');

describe('login component', function () {
	var ctrl;
	var $scope;
	var $state;
	var AuthenticationService;
	beforeEach(function () {

		var moduleName = 'app.login';

		var mock$state = function () {
			return {};
		};
		var mockAuthenticationService = function () {
			return {
				performSignonWithEmployeeID : function (p1,p2) {

				},
				performSignonWithSSN: function(p1,p2)
				{

				},
				performSignonWithCustomID : function (p1,p2) {

				}
			};
		};

		angular
			.module(moduleName, [])
			.service('$state',mock$state)
			.service('AuthenticationService',mockAuthenticationService)
			.component('tnLoginController', tnLoginController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_$state_,_AuthenticationService_ ) {
		$scope = $rootScope.$new();
		$state=_$state_;
		AuthenticationService=_AuthenticationService_;

		var locals = {
			$scope: $scope,
			$state:$state,
			AuthenticationService:AuthenticationService
		};
		ctrl = $componentController('tnLoginController', locals, null);
	}));
	it('ctrl variables should be active tab equal to 0 ',function(){
		ctrl.activeTab=0;
		ctrl.onLogin();
	});
	it('ctrl variables should be active tab equal to 1 ',function(){
		ctrl.activeTab=1;
		ctrl.onLogin();
	});
	it('ctrl variables should be active tab equal to 2 ',function(){
		ctrl.activeTab=2;
		ctrl.onLogin();
	});

});
