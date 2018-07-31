'use strict';

var angular = require('angular');
require('angular-mocks');

var profilePicture = require('./picture.service');

describe('picture service', function() {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig;

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
		var mockprofileUrlConfig = function () {
			return {
				resources:
					{
						picture :''
					}
			}
		};

		var moduleName = 'trinet.shared.services.profile.picture';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('profileUrlConfig',mockprofileUrlConfig)
			.service('profilePicture', profilePicture);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_profilePicture_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		profilePicture = _profilePicture_;
		$scope = $rootScope.$new();
		DS=_DS_;
		profileUrlConfig=_profileUrlConfig_;

		deferred=$q.defer();

	}));

	it('should return a value',function() {
	});

});
