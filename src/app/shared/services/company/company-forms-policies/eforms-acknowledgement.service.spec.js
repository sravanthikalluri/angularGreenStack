
'use strict';

var angular = require('angular');
require('angular-mocks');

var eformsAcknowledgement= require('./eforms-acknowledgement.service');

describe('eforms-acknowledgement service', function() {

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


		var moduleName = 'trinet.shared.services.company.company-forms-policies';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('eformsAcknowledgement', eformsAcknowledgement);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_eformsAcknowledgement_,_DS_, $q,$rootScope) {
		eformsAcknowledgement = _eformsAcknowledgement_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


