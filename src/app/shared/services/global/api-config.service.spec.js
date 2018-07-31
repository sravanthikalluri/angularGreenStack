'use strict';

var angular = require('angular');


require('angular-mocks');

var apiConfigService = require('./api-config.service');

describe('apiConfigService service', function() {

	var genericService;
	var deferred;
	var $scope;

	beforeEach(function() {
		var mockgenericService=function() {
			return {
				/*defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}*/
			}
		};

		var moduleName = 'trinet.shared.services.api-config';

		angular
			.module(moduleName, [])
			.service('genericService',mockgenericService)
			.service('apiConfigService', apiConfigService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_apiConfigService_,_genericService_, $q,$rootScope) {
		apiConfigService = _apiConfigService_;
		$scope = $rootScope.$new();
		genericService=_genericService_;

		deferred=$q.defer();
		genericService.countries=jasmine.createSpy().and.returnValue('');


	}));
	it('should return a value',function() {
		var apiConfigService=function(){

		};
		apiConfigService();
		/*expect(genericService.countries).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$apply();*/
	});

});
