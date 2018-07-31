'use strict';

var angular = require('angular');
require('angular-mocks');

var validateZip = require('./validate-zip.directive');
var rootScope,compile,element;

describe('validateZip directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-zip';

		angular
			.module(moduleName, [])

			.directive('validateZip',validateZip);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate zip testing',function(){
		element = angular.element('<input type="text" value="12345" ng-model="zip" validate-zip></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});

