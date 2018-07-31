'use strict';

var angular = require('angular');


require('angular-mocks');

var Header = require('./header.service');

describe('Header service', function() {

	var DS;
	var deferred;
	var $scope;
	var moment;


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
		var mockMomentService=function() {
			return function (){

			}
		};
		var moduleName = 'trinet.shared.services.money.paycheck-details.employer-benefits-taxable';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moment',mockMomentService)
			.service('Header', Header);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Header_,_DS_,_moment_, $q,$rootScope) {
		Header = _Header_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moment=_moment_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
