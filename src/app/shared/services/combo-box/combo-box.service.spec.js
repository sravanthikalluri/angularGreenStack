'use strict';

var angular = require('angular');


require('angular-mocks');

var ComboBoxService = require('./combo-box.service');

describe('ComboBoxService service', function() {

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

		var moduleName = 'trinet.shared.services.combo-box';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('ComboBoxService', ComboBoxService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_ComboBoxService_,_DS_, $q,$rootScope) {
		ComboBoxService = _ComboBoxService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
