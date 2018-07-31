'use strict'

var angular = require('angular');
require('angular-mocks');

var validateCity = require('./validate-city.directive');
var rootScope,compile,element;

describe('validate city directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-city';

		angular
			.module(moduleName, [])
			.directive('validateCity', validateCity);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate city testing',function(){
		element = angular.element('<input type="text" value="Hyderabad" ng-model="city" validate-city></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
