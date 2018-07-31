'use strict';

var angular = require('angular');


require('angular-mocks');

var CompanyAnnouncementsService = require('./company-announcements.service');

describe('CompanyAnnouncementsService service', function() {

	var DS;
	var deferred;
	var $scope;
	var manageEmpUrlConfig={
		"resources":{
			"employee":"",
			"announcements":"",
			"":""
		},
		"manageBaseUrl":"",
	};

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {
					var deserialize=function() {
						return {
							id : "",
							res: ""
						}
					};
					return deserialize();
				},
			}
		};

		var moduleName = 'trinet.shared.services.company-announcements';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('manageEmpUrlConfig',manageEmpUrlConfig)
			.service('CompanyAnnouncementsService', CompanyAnnouncementsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CompanyAnnouncementsService_,_DS_, $q,$rootScope,_manageEmpUrlConfig_) {
		CompanyAnnouncementsService = _CompanyAnnouncementsService_;
		manageEmpUrlConfig=_manageEmpUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	/*	deserialize();*/
	});

});
