'use strict';

var angular = require('angular');
require('angular-mocks');

var validateDollarAmount = require('./validate-dollar-amount.directive');
var rootScope,compile,element;

describe('validate-dollar-amount directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-dollar-amount';

		angular
			.module(moduleName, [])
			.directive('validateDollarAmount', validateDollarAmount);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate dollar amount testing',function(){
		element = angular.element('<input type="text" value="dollar" ng-model="dollar" validate-dollar-amount></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
