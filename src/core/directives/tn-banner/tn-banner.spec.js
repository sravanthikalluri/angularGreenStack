'use strict'

var angular = require('angular');
require('angular-mocks');

var tnBanner = require('./tn-banner.directive');
var rootScope,compile,element;

describe('tn banner directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-banner';

		angular
			.module(moduleName, [])
			.directive('tnBanner', tnBanner);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-button testing',function(){
		element = angular.element('<tn-banner></tn-banner>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
