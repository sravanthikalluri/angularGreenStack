'use strict';

var angular = require('angular');
require('angular-mocks');

var tnKeyEnter = require('./tn-key-enter.directive');
var rootScope,compile,element;

describe('tn-key-enter directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-enter-action';

		angular
			.module(moduleName, [])
			.directive('tnKeyEnter', tnKeyEnter);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-key-enter testing',function(){
		element = angular.element('<input type="text" value="enter" ng-model="enter" tn-key-enter></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
