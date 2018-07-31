'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEditProfileEmergency = require('./tn-edit-profile-emergency.component');

describe('tn-edit-profile-emergency component', function() {
	var results={"emergencyContacts":[{
		"name": [{
			"fullName":""

		},{
			"fullName":""

		}],
		"firstName":"",
		"lastName":"",
		"primaryContactFlag":"N",
		"sameAddressPerson":"N"
	}]
	};
	var $scope;
	var ProfileDataService;
	var saveDeferred;
	var ctrl;

	beforeEach(function() {
		var mockProfileDataService = function() {
			return {};
		};

		var moduleName = 'trinet.shared.components.tn-edit-profile-emergency';

		angular
			.module(moduleName, [])
			.service('ProfileDataService', mockProfileDataService)
			.component('tnEditProfileEmergency', tnEditProfileEmergency);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController, _ProfileDataService_) {
		var locals;

		$scope = $rootScope.$new();
		ProfileDataService = _ProfileDataService_;

		// Stub the service functions
		saveDeferred = $q.defer();
		ProfileDataService.getForm = jasmine.createSpy().and.returnValue(results);
		ProfileDataService.saveEmergency= jasmine.createSpy().and.returnValue(results);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			ProfileDataService: ProfileDataService
		};

		// Initialize Component Controller
		ctrl = $componentController('tnEditProfileEmergency', locals, null);
	}));

	it('should be initialized with Profile Form data', function() {
		ctrl.$onInit();
		expect(ProfileDataService.getForm).toHaveBeenCalled();
		saveDeferred.resolve(results);
		$scope.$digest();
	});
	it('should create a emergency Profile form data ', function() {
		var mockResult = {};
		ctrl.data={
			"emergencyContact":{"name":[{
				"name":""
			}]

			}
		};
		var form = {
			$valid: true
		};
		$scope.$digest();
		ctrl.createEmergecny(form);
		expect(ProfileDataService.saveEmergency).toHaveBeenCalled();
		saveDeferred.resolve(results);
		$scope.$digest();
	});
	it('should show error message if form name is invalid',function() {
		ctrl.data={
			"emergencyContact":{"name":[{
				"name":""
			}]

			}
		};

		var form = {
			$valid: false
		};
		$scope.$digest();
		ctrl.createEmergecny(form);
	});


	it('should return emp address',function() {
		ctrl.data={"emergencyContact":{
			"name":"name"
		}
			,
			"bool":"true",
			"address":
				{
					"address1":"address1",
					"address2":"address2",
					"city":"city",
					"state":"state",
					"postalCode":"postalCode"
				}
			};
	/*	ctrl.data.emergencyContact.address.address1 = ctrl.data.address.address1;
		ctrl.data.emergencyContact.address.address2 = ctrl.data.address.address2;
		ctrl.data.emergencyContact.address.city = ctrl.data.address.city;
		ctrl.data.emergencyContact.address.state = ctrl.data.address.state;
		ctrl.data.emergencyContact.address.postalCode = ctrl.data.address.postalCode;*/
	ctrl.data={
		"emergencyContact":{
			"address":[{
				"address1":"",
				"address2":"",
				"city":"",
				"state":"",
				"postalCode":""
			}],
			"isSameAsEmployeeAddress":""
		},
		"address":[{
			"address1":"",
			"address2":"",
			"city":"",
			"state":"",
			"postalCode":""
		}],
	};

		var bo=true;
		ctrl.getEmpAddress(bo);
	});

});
