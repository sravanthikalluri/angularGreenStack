'use strict';

var angular = require('angular');
require('angular-mocks');

var validateSsn = require('./validate-ssn.directive');
var rootScope,compile,element;

describe('validateSsn directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-ssn';

		angular
			.module(moduleName, [])

			.directive('validateSsn',validateSsn);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate ssn testing',function(){
		element = angular.element('<input type="text" value="12345" ng-model="ssn" validate-ssn></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});

