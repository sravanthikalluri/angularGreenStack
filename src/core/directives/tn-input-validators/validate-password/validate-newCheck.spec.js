'use strict';

var angular = require('angular');
require('angular-mocks');

var validateNew = require('./validate-newCheck.directive');
var rootScope,compile,element;

describe('validateNew directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-password';

		angular
			.module(moduleName, [])

			.directive('validateNew',validateNew);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate new password testing',function(){
		element = angular.element('<input type="text" value="john" ng-model="name" validate-new></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});

