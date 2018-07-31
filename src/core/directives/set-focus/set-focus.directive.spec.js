'use strict'

var angular = require('angular');
require('angular-mocks');

var setFocus = require('./set-focus.directive');
var rootScope,compile,element;

describe('set focus directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.set-focus';

		angular
			.module(moduleName, [])
			.directive('setFocus', setFocus);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('set focus testing',function(){
		element = angular.element('<input type="text" value="focus" ng-model="focus" set-focus></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
