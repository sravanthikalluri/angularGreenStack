'use strict';

var angular = require('angular');


require('angular-mocks');

var SecretQuestion = require('./secret-question.service');

describe('SecretQuestion service', function() {

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


		var moduleName = 'trinet.shared.services.secret-question';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)

			.service('SecretQuestion',SecretQuestion);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_SecretQuestion_,_DS_, $q,$rootScope) {
		SecretQuestion= _SecretQuestion_;
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


