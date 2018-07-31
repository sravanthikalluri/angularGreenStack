'use strict'

var angular = require('angular');
require('angular-mocks');

var tnBindHtml = require('./tn-bind-html.directive');
var rootScope,compile,element;

describe('tn bind html directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-bind-html';

		angular
			.module(moduleName, [])
			.directive('tnBindHtml', tnBindHtml);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-button testing',function(){
		element = angular.element('<tn-bind-html content="directive"></tn-bind-html>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
