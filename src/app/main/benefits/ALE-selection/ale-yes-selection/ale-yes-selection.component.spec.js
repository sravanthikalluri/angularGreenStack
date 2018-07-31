
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnAleYesSelectionController = require('./ale-yes-selection.component');

describe('tca-all-other component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.benefits.ALE-selection.ale-yes-selection';
		angular
			.module(moduleName, [])
			.component('tnAleYesSelectionController', tnAleYesSelectionController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnAleYesSelectionController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
