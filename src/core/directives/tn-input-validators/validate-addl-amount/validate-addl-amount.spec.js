'use strict'

var angular = require('angular');
require('angular-mocks');

var validateAdditionalAmount = require('./validate-addl-amount.directive');
var rootScope,compile,element;

describe('validate additional amount directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-addl-amount';

		angular
			.module(moduleName, [])
			.directive('validateAddlAmount', validateAdditionalAmount);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate additional amount testing',function(){
		element = angular.element('<input type="text" value=500 ng-model="addtional" validate-addl-amount></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
