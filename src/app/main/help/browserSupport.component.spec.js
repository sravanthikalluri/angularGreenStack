
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnbrowserSupportCtrl = require('./browserSupport.component');

describe('browserSupport component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.company.help';
		angular
			.module(moduleName, [])
			.component('tnbrowserSupportCtrl', tnbrowserSupportCtrl);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnbrowserSupportCtrl', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
