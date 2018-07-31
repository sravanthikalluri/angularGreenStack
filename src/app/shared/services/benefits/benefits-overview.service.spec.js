'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsOverview = require('./benefits-overview.service');

describe('BenefitsOverviewService service', function() {

	var DS;
	var deferred;
	var $scope;
	var $filter;
	var logoImagesConfig;

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
		var mock$filter = function () {
			return {};
		};
		var mocklogoImagesConfig= function () {
			return {};
		};

		var moduleName = 'trinet.shared.services.benefits';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$filter',mock$filter)
			.service('logoImagesConfig',mocklogoImagesConfig)
			.service('benefitsOverview', benefitsOverview);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_benefitsOverview_,_DS_, $q,_$filter_,_logoImagesConfig_,$rootScope) {
		benefitsOverview = _benefitsOverview_;
		$scope = $rootScope.$new();
		DS=_DS_;
		$filter=_$filter_;
		logoImagesConfig=_logoImagesConfig_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		var data={
			"data":{
				"data":""
			}
		};
		var resourceConfig={};
		benefitsOverview.deserialize(resourceConfig,data);
	});

	it('should parse current Benefits',inject(function(benefitsOverview) {
		var data={
			"data":{
				"data":""
			}
		};
		benefitsOverview._parseCurrentBenefits(data);
	}));
});
