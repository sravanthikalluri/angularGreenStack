'use strict';

var angular = require('angular');


require('angular-mocks');

var SuffixesService = require('./suffixes.service');

describe('SuffixesService service', function() {

	var DS;
	var deferred;
	var $scope;

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

		var moduleName = 'trinet.shared.services.suffixesService';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('SuffixesService', SuffixesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_SuffixesService_,_DS_, $q,$rootScope) {
		SuffixesService = _SuffixesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
