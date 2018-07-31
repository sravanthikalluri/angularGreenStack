

var angular = require('angular');
var moment = require('moment')

require('angular-mocks');

var ProxyService = require('./proxy.service');

describe('proxy service', function() {

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
		var mockmomentService=function() {
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

		var moduleName = 'trinet.shared.services.settings.proxy';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moment',mockmomentService)
			.service('ProxyService',ProxyService)

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_ProxyService_,_DS_, $q,$rootScope,_moment_) {
		ProxyService = _ProxyService_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moment=_moment_;
		deferred=$q.defer();

	//	DS.find=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		/*ctrl.deserialize=function(resourceConfig,response){

		 };*/
		//svc.fetchAllDirectDepositAccounts();
	});

});



