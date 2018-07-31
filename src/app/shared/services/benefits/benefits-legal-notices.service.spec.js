'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsLegalNotices = require('./benefits-legal-notices.service');

describe('BenefitsLegalNotices service', function() {

	var DS;
	var deferred;
	var $scope;
	var benefitsUrlConfig;

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
		var mockbenefitsUrlConfig=function() {
		return {
			policiesEmpApi : { },
			policiesUrl : { },
			resources : { benefitPolicy : " "}
		    }
		};
		var moduleName = 'trinet.shared.services.benefits';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('benefitsUrlConfig',mockbenefitsUrlConfig)
			.service('benefitsLegalNotices', benefitsLegalNotices);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_benefitsLegalNotices_,_DS_, $q,$rootScope,_benefitsUrlConfig_) {
		benefitsLegalNotices = _benefitsLegalNotices_;
		benefitsUrlConfig=_benefitsUrlConfig_;
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
