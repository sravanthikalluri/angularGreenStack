'use strict';

var angular = require('angular');
require('angular-mocks');

var validatePhone = require('./validate-phone.directive');
var rootScope,compile,element;

describe('validate-phone directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-phone';

		angular
			.module(moduleName, [])
			.directive('validatePhone', validatePhone);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate phone amount testing',function(){
		element = angular.element('<input type="text" value="phone" ng-model="phone" validate-phone></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
