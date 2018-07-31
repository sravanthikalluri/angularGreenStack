
'use strict';

var angular = require('angular');


require('angular-mocks');

var CustomId= require('./custom-id.service');

describe('Password service', function() {

	var DS;
	var deferred;
	var $scope;
	var ctrl;
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


		var moduleName = 'trinet.shared.services.custom-id';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)

			.service('CustomId', CustomId);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CustomId_,_DS_, $q,$rootScope) {
		CustomId= _CustomId_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		/*ctrl.deserialize=function(resourceConfig,response){

		 };*/
	});

});




