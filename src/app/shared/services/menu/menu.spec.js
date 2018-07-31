'use strict';

var angular = require('angular');


require('angular-mocks');

var Menu = require('./menu.service');

describe('Menu service', function() {

	var DS;
	var navigationService;
	var sharedProperties;
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
		var mockNavigationService=function(){
			return function(){}
		};
		var mockSharedProperties=function(){
			return function(){}
		};
		var moduleName = 'trinet.shared.services.time-off.location';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('navigationService',mockNavigationService)
			.service('sharedProperties',mockSharedProperties)
			.service('Menu', Menu);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Menu_,_DS_,_navigationService_,_sharedProperties_ ,$q,$rootScope) {
		Menu = _Menu_;
		$scope = $rootScope.$new();
		DS =_DS_;
		navigationService= _navigationService_;
		sharedProperties = _sharedProperties_;
		deferred = $q.defer();

	}));
	it('should return a value',function() {

	});

});
