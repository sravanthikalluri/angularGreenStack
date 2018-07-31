/**
 * Created by Sravani on 2/8/2017.
 */
'use strict'

var angular = require('angular');
require('angular-mocks');

var tnLinkButton = require('./tn-link-button.directive');
var rootScope,compile,element;

describe('tn linkbutton directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-link-button';

		angular
			.module(moduleName, [])
			.directive('tnLinkButton',tnLinkButton);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-link-button testing',function(){
		element = angular.element('<tn-link-button></tn-link-button>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
