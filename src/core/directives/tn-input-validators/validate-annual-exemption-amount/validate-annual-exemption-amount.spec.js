'use strict';

var angular = require('angular');
require('angular-mocks');

var validateAnnualExemptionAmount = require('./validate-annual-exemption-amount.directive');
var rootScope,compile,element;

describe('validate annual exemption amount directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-annual-exemption-amount';

		angular
			.module(moduleName, [])
			.directive('validateAnnualExemptionAmount', validateAnnualExemptionAmount);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate annual exemption amount testing',function(){
		element = angular.element('<input type="text" value=500 ng-model="exemption" validate-annual-exemption-amount></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
