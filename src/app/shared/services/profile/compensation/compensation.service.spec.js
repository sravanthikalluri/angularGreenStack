'use strict';

var angular = require('angular');


require('angular-mocks');

var compensation = require('./compensation.service');

describe('compensation service', function() {

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
		var mockprofileUrlConfig=function() {

			return {
				"profileBase":"",
				resources:
					{
						"compensation":""
					}
			}


		};
		var moduleName = 'trinet.shared.services.profile.compensation';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('profileUrlConfig',mockprofileUrlConfig)
			.service('compensation', compensation);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_compensation_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		compensation = _compensation_;
		profileUrlConfig=_profileUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		//DS.find('benefit-options','').then(function(response) {})
		/*expect(DS.defineResource).toHaveBeenCalled();
		 deferred.resolve({});
		 $scope.$digest();*/
	});

});
