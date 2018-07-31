'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var tnEditProfileNamesContacts = require('./tn-edit-profile-names-contacts.component');

describe('tn-edit-profile-names-contacts component', function () {
	var $scope;
	var ctrl;
	var ProfileDataService;
	var deferred;

	var results = {
		"contacts": {
			"contacts": [{
				"Email": "",
				"Phone": ""
			}, {
				"Email": "",
				"Phone": ""
			}]

		},
		"names": {
			"names": {
				"priNamesActiveList": [{
					"employeeId": "00012365478"
				}, {}],
				"prfNamesCurrentList": [{
					"employeeId": "00012365478"
				}, {}],
			},
		},
		"dropdown": {
			"accessTypes": [{
				"key": ""
			}]
		}
	};
	beforeEach(function () {
		var mockProfileDataService = function () {
			return;
		};
		var mockMomentService = function () {
			return function (dateString) {
				return moment(dateString).format('YYYY-MM-DD');
			};
		};

		var moduleName = 'trinet.shared.components.tn-edit-profile-names-contacts';

		angular
			.module(moduleName, [])
			.service('ProfileDataService', mockProfileDataService)
			.service('moment', mockMomentService)
			.component('tnEditProfileNamesContacts', tnEditProfileNamesContacts);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, _ProfileDataService_, $q) {
		var locals;
		$scope = $rootScope.$new();
		ProfileDataService = _ProfileDataService_;

		deferred = $q.defer();
		ProfileDataService.getForm = jasmine.createSpy().and.returnValue(results);
		ProfileDataService.saveNameContacts = jasmine.createSpy().and.returnValue(results);
		locals = {
			$scope: $scope,
			ProfileDataService: ProfileDataService,
			moment: moment
		};
		ctrl = $componentController('tnEditProfileNamesContacts', locals, null);
	}));
	it('should initilize the component', function () {

		ctrl.data = {
			"contacts": [{
				"contacts": [{
					"Email": "",
					"Phone": ""
				}, {
					"Email": "",
					"Phone": ""
				}]

			}],
			"names": {
				"names": {
					"priNamesActiveList": [{
						"employeeId": "00012365478"
					}, {}]
				},
			},
			"dropdown": {
				"accessTypes": [{
					"key": ""
				}, {
					"key": ""
				}]
			}
		};
		ctrl.$onInit();
		expect(ProfileDataService.getForm).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
	});

	it('should return the data from object', function () {
		ctrl._createObject = function () {

		};
		ctrl._createObject();
	});
	it('should set the value', function () {
		var type = "Email";
		var value = "";
		ctrl.setvalue(type, value);
	});


	it('removes the contact', function () {
		ctrl.data = {
			"contacts": [{
				"Email": ""
			}, {
				"Email": ""
			}],
			"names": [{

				"names": {
					"priNamesActiveList": "",


				},
			}]
		};
		var index = 0;
		ctrl.removeContact(index);
	});
	it('add new mailId', function () {
		ctrl.data = {
			"contacts": [{
				"Email": ""
			}, {
				"Email": ""
			}],
			"names": {
				"names": {
					"priNamesActiveList": [{
						"employeeId": "00012365478"
					}, {}]
				},
			},
			"dropdown": {
				"accessTypes": [{
					"key": ""
				}]
			}
		};

		ctrl.addNewEmailField();
	});
	it('should save the contacts', function () {
		var mockResult = {};
		ctrl.data = {
			"contacts": [{
				"Phone": ""
			}, {
				"Phone": ""
			}],
			"names": {
				"names": {
					"priNamesActiveList": [{
						"employeeId": "00012365478"
					}, {}]
				},
			},
			"dropdown": {
				"accessTypes": [{
					"key": ""
				}, {
					"key": ""
				}]
			}
		};
		var form = {
			$valid: true
		};
		$scope.$digest();
		ctrl.saveNameContactSection(form);
		expect(ProfileDataService.saveNameContacts).toHaveBeenCalledWith(ctrl.data);
		deferred.resolve(mockResult);
		$scope.$digest();

	});
	it('should show error message if formname is invalid', function () {


		var form = {
			$valid: false
		};
		$scope.$digest();
		ctrl.saveNameContactSection(form);


	});
	it('should add new phone filed', function () {
		ctrl.data = {
			"contacts": [{
				"Phone": ""
			}, {
				"Phone": ""
			}],
			"names": {
				"names": {
					"priNamesActiveList": [{
						"employeeId": "00012365478"
					}, {}]
				},
			},
			"dropdown": {
				"accessTypes": [{
					"key": ""
				}, {
					"key": ""
				}]
			}
		};

		ctrl.addNewPhoneField();
	});


});

