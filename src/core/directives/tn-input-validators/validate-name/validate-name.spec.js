'use strict';

var angular = require('angular');
require('angular-mocks');

var validateName = require('./validate-name.directive');
var rootScope,compile,element;

describe('validateName directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-name';

		angular
			.module(moduleName, [])

			.directive('validateName',validateName);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate name testing',function(){
		element = angular.element('<input type="text" value="john" ng-model="name" validate-name></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});

