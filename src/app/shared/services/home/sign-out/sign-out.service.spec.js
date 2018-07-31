'use strict';

var angular = require('angular');


require('angular-mocks');

var signOut = require('./sign-out.service');

describe('signOut service', function() {

	var DS;
	var deferred;
	var $scope;
	var loginUrlConfig={
		"resources":{
			"profile":{}
		}
	};

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};


		var moduleName = 'trinet.shared.services.sign-out';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('loginUrlConfig',loginUrlConfig)
			.service('signOut', signOut);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_signOut_,_DS_, $q,$rootScope,_loginUrlConfig_) {
		signOut = _signOut_;
		loginUrlConfig=_loginUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
