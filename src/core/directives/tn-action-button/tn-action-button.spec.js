'use strict'

var angular = require('angular');
require('angular-mocks');

var tnActionButton = require('./tn-action-button.directive');
var rootScope,compile,element;

describe('tn action button directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-action-button';

		angular
			.module(moduleName, [])
			.directive('tnActionButton', tnActionButton);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-button testing',function(){
		element = angular.element('<tn-action-button></tn-action-button>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
