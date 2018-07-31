'use strict';

var angular = require('angular');
require('angular-mocks');

var validateAddress = require('./validate-address.directive');
var rootScope,compile,element;

describe('validate address directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-address';

		angular
			.module(moduleName, [])
			.directive('validateAddress', validateAddress);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate address testing',function(){
		element = angular.element('<input type="text" value="address" ng-model="address" validate-address></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
