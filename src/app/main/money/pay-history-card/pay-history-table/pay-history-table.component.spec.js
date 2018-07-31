
'use strict';

var angular = require('angular');
require('angular-mocks');

var payHistoryTable = require('./pay-history-table.component');

describe('pay-history-table component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.money.pay-history-card.pay-history-table';
		angular
			.module(moduleName, [])
			.component('payHistoryTable', payHistoryTable);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('payHistoryTable', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
