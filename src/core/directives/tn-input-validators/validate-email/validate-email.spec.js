'use strict';

var angular = require('angular');
require('angular-mocks');

var validateEmail = require('./validate-email.directive');
var rootScope,compile,element;

describe('validate-email directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-email';

		angular
			.module(moduleName, [])
			.directive('validateEmail', validateEmail);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate email testing',function(){
		element = angular.element('<input type="text" value="email" ng-model="email" validate-email></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
