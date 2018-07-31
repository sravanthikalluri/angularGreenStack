'use strict';

var angular = require('angular');
require('angular-mocks');

var validateEntry = require('./validate-entry.directive');
var rootScope,compile,element;

describe('validate-entry directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-entry';

		angular
			.module(moduleName, [])
			.directive('validateEntry', validateEntry);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate entry testing',function(){
		element = angular.element('<input type="text" value="entry" ng-model="entry" validate-entry></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
