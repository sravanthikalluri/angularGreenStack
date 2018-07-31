'use strict';
var angular = require('angular');
require('angular-mocks');
var hrpSignOnUService = require('./hrp-sign-on-u.service');

describe('hrpSignOnUService service', function() {

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
		var moduleName = 'trinet.shared.services.hrp-sign-on-u';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockGsoService)
			.service('$http',mock$http)
			.service('$cookies',mock$cookies)
			.service('$timeout',mock$timeout)
			.service('$window',mock$window)
			.service('hrpSignOnUService', hrpSignOnUService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_hrpSignOnUService_,_DS_, $q,$rootScope,_gso_,_$http_,_$cookies_,_$timeout_,_$window_) {
		hrpSignOnUService = _hrpSignOnUService_;
		gso=_gso_;
		$scope = $rootScope.$new();
		DS=_DS_;
		$http = _$http_;
		$cookies= _$cookies_;
		$timeout = _$timeout_;
		$window = _$window_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
