'use strict';

var angular = require('angular');
require('angular-mocks');

var validateRetirementAmount = require('./validate-retirement-amount.directive');
var rootScope,compile,element;

describe('validate-retirement-amount directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-retirement-amount';

		angular
			.module(moduleName, [])
			.directive('validateRetirementAmount', validateRetirementAmount);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate retirement-amount amount testing',function(){
		element = angular.element('<input type="text" value="retirement" ng-model="retirement" validate-retirement-amount></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
