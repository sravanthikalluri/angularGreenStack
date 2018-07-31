'use strict';

var angular = require('angular');
require('angular-mocks');

var validateCustom = require('./validate-custom.directive');
var rootScope,compile,element;

describe('validate custom directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-custom';

		angular
			.module(moduleName, [])
			.directive('validateCustom', validateCustom);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate custom testing',function(){
		element = angular.element('<input type="text" value="custom" ng-model="custom" validate-custom></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
