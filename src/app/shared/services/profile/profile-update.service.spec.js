
'use strict';

var angular = require('angular');


require('angular-mocks');

var profileUpdateService= require('./profile-update.service');

describe('profileUpdateService service', function() {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig;
	var ctrl;
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

		var mockprofileUrlConfigConstant={
			resources:{
				address:{}
			}

		};

		var moduleName = 'trinet.shared.services.profile-update';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('profileUrlConfig',mockprofileUrlConfigConstant)
			.service('profileUpdateService', profileUpdateService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_profileUpdateService_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		profileUpdateService = _profileUpdateService_;
		$scope = $rootScope.$new();
		DS=_DS_;
		profileUrlConfig=_profileUrlConfig_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	/*it('should return a value',function() {
ctrl.namesUpdateService();
	});
	it('should return a value',function() {
		ctrl.emergencyContactUpdateService();
	});
	it('should return a value',function() {
		ctrl.addressUpdateService();
	});
	it('should return a value',function() {
		ctrl.personalInfoUpdateService();
	});
	it('should return a value',function() {
		ctrl.personalStatusUpdateService();
	});
	it('should return a value',function() {
		ctrl.contactsUpdateService() ;
	});*/

	it('should return a value',function() {

	});


});





