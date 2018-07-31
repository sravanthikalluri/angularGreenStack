
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaK1eK1dController = require('./tca-k1e-k1d.component');

describe('tca-k1e-k1d component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-k1e-k1d';
		angular
			.module(moduleName, [])
			.component('tnTcaK1eK1dController', tnTcaK1eK1dController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaK1eK1dController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
