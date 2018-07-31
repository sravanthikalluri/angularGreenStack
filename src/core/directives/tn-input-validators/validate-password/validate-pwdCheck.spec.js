'use strict';

var angular = require('angular');
require('angular-mocks');

var validateCheck = require('./validate-pwdCheck.directive');
var rootScope,compile,element;

describe('validatePassword directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-password';

		angular
			.module(moduleName, [])

			.directive('validateCheck',validateCheck);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate pwd check testing',function(){
		element = angular.element('<input type="text" value="john" ng-model="name" validate-check></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});

