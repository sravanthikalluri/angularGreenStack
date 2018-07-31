
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaUsK1Controller = require('./tca-us-k1.component');

describe('tca-us-k1 component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-us-k1';
		angular
			.module(moduleName, [])
			.component('tnTcaUsK1Controller', tnTcaUsK1Controller);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaUsK1Controller', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
