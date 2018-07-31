'use strict';

var angular = require('angular');
require('angular-mocks');

var validatePercentage = require('./validate-percentage.directive');
var rootScope,compile,element;

describe('validate-percentage directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-percentage';

		angular
			.module(moduleName, [])
			.directive('validatePercentage', validatePercentage);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate percentage testing',function(){
		element = angular.element('<input type="text" value="percentage" ng-model="percentage" validate-percentage></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
