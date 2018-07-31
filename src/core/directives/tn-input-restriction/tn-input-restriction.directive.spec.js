'use strict';

var angular = require('angular');
require('angular-mocks');

var tnInputRestriction = require('./tn-input-restriction.directive');
var rootScope,compile,element;

describe('tn-input-restriction directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-restriction';

		angular
			.module(moduleName, [])
			.directive('tnInputRestriction', tnInputRestriction);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;
	}));

	it('tn-input-restriction testing',function(){
		element = angular.element('<input type="text" value="restriction" ng-model="restriction" tn-input-restriction></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
