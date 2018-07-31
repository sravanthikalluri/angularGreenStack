'use strict';

var angular = require('angular');
require('angular-mocks');

var ssoArtifactsService = require('./sso-artifacts.service');

describe('sso-artifacts service', function() {

	var DS;
	var deferred;
	var $scope;
	var stringUtil;
	var me = {}

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

		var mockstringUtil= function () {
			return {}
		};

		var moduleName = 'app.main.sso';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('stringUtil',mockstringUtil)
			.service('ssoArtifactsService', ssoArtifactsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_ssoArtifactsService_,_DS_, $q,$rootScope,_stringUtil_) {
		ssoArtifactsService = _ssoArtifactsService_;
		stringUtil=_stringUtil_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);
		me.find.before = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		me.createStorageKey = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		me.getSSOResponseFromLocalStorage = jasmine.createSpy().and.returnValue(saveDeffered.promise);
		me.cacheSSOResponseToLocalStorage = jasmine.createSpy().and.returnValue(saveDeffered.promise);

	}));
	/*it('should return a value',inject(function(ssoArtifactsService) {
		ssoArtifactsService.find.before('','');
	}));*/
	/*it('should return a value for createStorageKey',inject(function(ssoArtifactsService) {
		ssoArtifactsService.createStorageKey('00000223332','001','dss','dsdfd','sdfsfsdf');
	}));
	it('should return a value for getSSOResponseFromLocalStorage',inject(function(ssoArtifactsService) {
		ssoArtifactsService.getSSOResponseFromLocalStorage('145454');
	}));
	it('should return a value for cacheSSOResponseToLocalStorage',inject(function(ssoArtifactsService) {
		ssoArtifactsService.cacheSSOResponseToLocalStorage('dfdsf','145454');
	}));
*/
});
