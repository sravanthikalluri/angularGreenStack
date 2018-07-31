'use strict';

var angular = require('angular');


require('angular-mocks');

var contact = require('./contact.service');

describe('contact service', function() {

	var DS;
	var companyUrlConfig;
	var gso;
	var $filter;
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

		var mockcompanyUrlConfig = function () {
			return {
				resources : {
					manageCompany : {}
				}
			};
		};
		var mockgso = function () {
			return {};
		};
		var mock$filter = function () {
			return {};
		};

		var moduleName = 'trinet.shared.services.contact';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('contact', contact)
			.service('companyUrlConfig', mockcompanyUrlConfig)
			.service('gso', mockgso)
			.service('$filter', mock$filter)

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_contact_,_DS_,_companyUrlConfig_,_gso_,_$filter_, $q,$rootScope) {
		contact = _contact_;
		$scope = $rootScope.$new();
		DS=_DS_;
		companyUrlConfig=_companyUrlConfig_;
		gso=_gso_;
		$filter=_$filter_;

		deferred=$q.defer();
		DS.defineResource=jasmine.createSpy().and.returnValue();

	}));
	it('should return a value',function() {
		/*ctrl.deserialize=function(resourceConfig,response){

                 };*/
	});

});

