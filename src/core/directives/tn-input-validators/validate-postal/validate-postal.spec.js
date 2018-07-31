'use strict';

var angular = require('angular');
require('angular-mocks');

var validatePostal = require('./validate-postal.directive');
var rootScope,compile,element;

describe('validate postal directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-postal';

		angular
			.module(moduleName, [])
			.directive('validatePostal', validatePostal);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate postal testing',function(){
		element = angular.element('<input type="number" value=99999 ng-model="postal" validate-postal></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});

