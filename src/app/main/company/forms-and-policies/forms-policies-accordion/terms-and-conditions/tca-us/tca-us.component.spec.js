
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaUsController = require('./tca-us.component');

describe('tca-us component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-us';
		angular
			.module(moduleName, [])
			.component('tnTcaUsController', tnTcaUsController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaUsController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
