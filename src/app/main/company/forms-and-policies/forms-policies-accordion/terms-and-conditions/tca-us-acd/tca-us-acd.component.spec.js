
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaUsAcdController = require('./tca-us-acd.component');

describe('tca-us-acd component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-us-acd';
		angular
			.module(moduleName, [])
			.component('tnTcaUsAcdController', tnTcaUsAcdController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaUsAcdController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
