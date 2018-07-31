
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTcaCepoTaController = require('./tca-cpeo-ta.component');

describe('tca-cpeo-ta component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.forms-and-policies.forms-policies-accordion.terms-and-conditions.tca-cpeo-ta';
		angular
			.module(moduleName, [])
			.component('tnTcaCepoTaController', tnTcaCepoTaController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTcaCepoTaController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
