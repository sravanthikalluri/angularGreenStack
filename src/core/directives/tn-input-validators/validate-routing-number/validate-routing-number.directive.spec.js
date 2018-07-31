'use strict';

var angular = require('angular');
require('angular-mocks');

var validateRoutingNumber = require('./validate-routing-number.directive');
var rootScope,compile,element;

describe('validate-retirement-amount directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-routing-number';

		angular
			.module(moduleName, [])
			.directive('validateRoutingNumber', validateRoutingNumber);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate routing number amount testing',function(){
		element = angular.element('<input type="text" value="00114124" ng-model="routing" validate-routing-number></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
