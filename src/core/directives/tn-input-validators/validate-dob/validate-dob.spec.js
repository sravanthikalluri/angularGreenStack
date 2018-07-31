'use strict';

var angular = require('angular');
require('angular-mocks');

var moment = require('moment');
var validateDob = require('./validate-dob.directive');
var rootScope,compile,element;

describe('validateDob directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.directives.tn-input-validators.validate-dob';
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};

		angular
			.module(moduleName, [])
			.service('moment',mockMomentService)
			.directive('validateDob',validateDob);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));

	it('validate-dob testing',function(){
		element = angular.element('<input type="date" value="09/02/2017" ng-model="dobDate" validate-dob></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});


