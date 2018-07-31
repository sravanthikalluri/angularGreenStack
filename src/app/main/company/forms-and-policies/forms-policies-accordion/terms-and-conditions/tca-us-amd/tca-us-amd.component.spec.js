
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaUsAmdController = require('./tca-us-amd.component');

describe('tca-us-amd component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-us-amd';
		angular
			.module(moduleName, [])
			.component('tnTcaUsAmdController', tnTcaUsAmdController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaUsAmdController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
