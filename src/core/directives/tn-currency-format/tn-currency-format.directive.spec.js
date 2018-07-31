'use strict'

var angular = require('angular');
require('angular-mocks');

var tnCurrencyFormat = require('./tn-currency-format.directive');
var rootScope,compile,element,$filter,attrs;

describe('tn-currency-format directive', function() {
	beforeEach(function() {
		var mock$filter = function () {

				attrs:
					{
						tnCurrencyFormat : " "
					}

        }

		var moduleName = 'trinet.core.directives.focus-invalid-field';

		angular
			.module(moduleName, [])
			.service('$filter',mock$filter)
			.directive('tnCurrencyFormat', tnCurrencyFormat);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile,_$filter_){
		rootScope = $rootScope;
		compile = $compile;
		$filter=_$filter_;
	}));

	it('tn-currency-format testing',function(){
		element = angular.element('<input type="text" value="currency" ng-model="currency" tn-currency-format></input>');
		compile(element)(rootScope.$new());
		var ctrl = true;
		rootScope.$digest();
		elem.on();
		ctrl.$formatters = {
			unshift : function() {

			}
		}
	});

});
