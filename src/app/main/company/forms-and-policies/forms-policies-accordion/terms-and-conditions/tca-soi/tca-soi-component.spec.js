
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaSOIController = require('./tca-soi.component');

describe('tca-soi component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-soi';
		angular
			.module(moduleName, [])
			.component('tnTcaSOIController', tnTcaSOIController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaSOIController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
