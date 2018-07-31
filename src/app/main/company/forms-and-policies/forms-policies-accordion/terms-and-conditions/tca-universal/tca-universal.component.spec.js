
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaUniversalController = require('./tca-universal.component');

describe('tca-universal component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-universal';
		angular
			.module(moduleName, [])
			.component('tnTcaUniversalController', tnTcaUniversalController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaUniversalController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
