
'use strict';

var angular = require('angular');


require('angular-mocks');

var ProxyDelete= require('./proxyDelete.service');

describe('ProxyDelete service', function() {

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


		var moduleName = 'trinet.shared.services.ProxyDelete';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('ProxyDelete', ProxyDelete);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_ProxyDelete_,_DS_, $q,$rootScope) {
		ProxyDelete= _ProxyDelete_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});







