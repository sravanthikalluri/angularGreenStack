'use strict'

var angular = require('angular');
require('angular-mocks');

var tnButton = require('./tn-button.directive');
var rootScope,compile,element;

describe('tn button directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-button';

		angular
			.module(moduleName, [])
			.directive('tnButton', tnButton);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-button testing',function(){
		element = angular.element('<tn-button></tn-button>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
