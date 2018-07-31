'use strict';

var angular = require('angular');
require('angular-mocks');

var aleSelection = require('./ale-based-notices.service');

describe('ale-based-notices service', function() {

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

		var moduleName = 'trinet.shared.services.notices';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('aleSelection', aleSelection);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_aleSelection_,_DS_, $q,$rootScope) {
		aleSelection = _aleSelection_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
