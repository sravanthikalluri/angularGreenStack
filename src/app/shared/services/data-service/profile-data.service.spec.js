'use strict';

var angular = require('angular');


require('angular-mocks');

var ProfileDataService = require('./profile-data.service');

describe('ProfileDataService service', function() {

	var DS;
	var deferred;
	var $scope;

	var ctrl;
	beforeEach(function() {
		var mockDSService=function() {
			return {

			}
		};


		var moduleName = 'trinet.shared.services.profile-data';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('ProfileDataService',ProfileDataService );

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_ProfileDataService_,_DS_, $q,$rootScope) {
		ProfileDataService = _ProfileDataService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));

});



