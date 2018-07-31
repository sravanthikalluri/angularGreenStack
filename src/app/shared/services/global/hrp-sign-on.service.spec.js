'use strict';
var angular = require('angular');
require('angular-mocks');
var hrpSignOnService = require('./hrp-sign-on.service');

describe('hrpSignOnService service', function() {

	var DS;
	var deferred;
	var $scope;
	var gso;
	var $http;
	var $cookies;
	var $window;
	var $timeout;
	beforeEach(function() {
		var mockDSService=function() {
			return {
			}
		};
		var mockGsoService=function() {
			return {};
		}
		var mock$http = function() {
			return {};
		}
		var mock$cookies = function() {
			return {};
		}
       var mock$window = function() {
			return {};
	   }
	   var mock$timeout = function() {
			return {};
	   }
		var moduleName = 'trinet.shared.services.hrp-sign-on';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockGsoService)
			.service('$http',mock$http)
			.service('$cookies',mock$cookies)
			.service('$timeout',mock$timeout)
			.service('$window',mock$window)
			.service('hrpSignOnService', hrpSignOnService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_hrpSignOnService_,_DS_, $q,$rootScope,_gso_,_$http_,_$cookies_,_$timeout_,_$window_) {
		hrpSignOnService = _hrpSignOnService_;
		gso=_gso_;
		$scope = $rootScope.$new();
		DS=_DS_;
		$http = _$http_;
		$cookies= _$cookies_;
		$timeout = _$window_;
		$window = _$timeout_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
