
'use strict'

var angular = require('angular');
require('angular-mocks');

var tnPrint = require('./tn-print.directive');
var rootScope,compile,element;

describe('tn-print directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-print';

		angular
			.module(moduleName, [])

			.directive('tnPrint',tnPrint);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;


	}));

	it('tn-link-button testing',function(){
		element = angular.element('<tn-print></tn-print>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});


