'use strict';

var angular = require('angular');
require('angular-mocks');

var validatePassword = require('./validate-password.directive');
var rootScope,compile,element;

describe('validatePassword directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-password';

		angular
			.module(moduleName, [])

			.directive('validatePassword',validatePassword);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate password testing',function(){
		element = angular.element('<input type="text" value="john" ng-model="name" validate-password></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});

