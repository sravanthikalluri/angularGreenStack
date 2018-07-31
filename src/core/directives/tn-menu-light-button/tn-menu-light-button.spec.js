
'use strict'

var angular = require('angular');
require('angular-mocks');

var tnMenuLightButton = require('./tn-menu-light-button.directive');
var rootScope,compile,element;

describe('tn MenuLightButton directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-menu-light-button';

		angular
			.module(moduleName, [])
			.directive('tnMenuLightButton',tnMenuLightButton);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('tn-link-button testing',function(){
		element = angular.element('<tn-menu-light-button></tn-menu-light-button>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
