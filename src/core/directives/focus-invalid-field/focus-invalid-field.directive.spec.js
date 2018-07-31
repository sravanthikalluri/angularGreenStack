'use strict'

var angular = require('angular');
require('angular-mocks');

var focusInvalidField = require('./focus-invalid-field.directive');
var rootScope,compile,element,$window,$timeout;

describe('focus-invalid-field directive', function() {
	beforeEach(function() {
	/*var mock$window = function () {
		return {
			on : function (p1,p2) {
				return {}
			}
		}
	}*/

		var moduleName = 'trinet.core.directives.focus-invalid-field';

		angular
			.module(moduleName, [])
			/*.service('$window',mock$window)*/
			.directive('focusInvalidField', focusInvalidField);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile,_$window_, _$timeout_){
		rootScope = $rootScope;
		compile = $compile;
		$window=_$window_;
		$timeout=_$timeout_;

	}));

	it('focus-invalid-field testing',function(){
		element = angular.element('<input type="text" value=focus ng-model="focus" focus-invalid-field></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
