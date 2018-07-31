
'use strict'

var angular = require('angular');
require('angular-mocks');

var tnScroll = require('./tn-scroll.directive');
var rootScope,compile,element;

describe('tn-scroll directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-scroll';

		angular
			.module(moduleName, [])
			.directive('tnScroll',tnScroll);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-scroll testing',function(){
		element = angular.element('<tn-scroll></tn-scroll>');
		compile(element)(rootScope.$new());
		rootScope.$digest();

	});

});
