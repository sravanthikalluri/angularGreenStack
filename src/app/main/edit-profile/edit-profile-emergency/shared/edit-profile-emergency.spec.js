'use strict';

var angular = require('angular');


require('angular-mocks');

var editProfileEmergency = require('./edit-profile-emergency.service');

describe('editProfileEmergency service', function() {

	var DS;
	var deferred;
	var $scope;
	var EditProfileEmergency;
	var US_STATES;
	var CA_PROVINCES={
		"resources":{

		}
	};
	var stringUtil;

	beforeEach(function() {
		var mockDSService = function() {
			return {
				bulkEjectAll : function () {
					return {}
				},
				ejectAll: function () {}
			}
		};
		var mockStringUtilService = function(){

			return function (formatString) {
				return stringUtil(formatString).format();
			}
		};

		var moduleName = 'trinet.main.edit-profile.edit-profile-emergency';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('US_STATES',US_STATES)
			.constant('CA_PROVINCES',CA_PROVINCES)
			.service('stringUtil',mockStringUtilService)
			.service('editProfileEmergency', editProfileEmergency);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_editProfileEmergency_,_DS_, $q,$rootScope,_CA_PROVINCES_,_US_STATES_,_stringUtil_) {
		EditProfileEmergency = _editProfileEmergency_;
		CA_PROVINCES=_CA_PROVINCES_;
		$scope = $rootScope.$new();
		DS=_DS_;
		US_STATES=_US_STATES_;
		stringUtil=_stringUtil_;

		deferred=$q.defer();
		/*DS.find('address', '');*/
		DS.find=jasmine.createSpy().and.returnValue(deferred.promise);
		DS.destroy=jasmine.createSpy().and.returnValue(deferred.promise);
		DS.getAll=function () {
			return [
				{
					countries: [{key: 'value'}, {key: 'value'}],
					relationShips: [{key: 'value'}, {key: 'value'}]
				}
			]
		};
		DS.findAll=jasmine.createSpy().and.returnValue(deferred.promise);
		DS.create=jasmine.createSpy().and.returnValue(deferred.promise);
		DS.update=jasmine.createSpy().and.returnValue(deferred.promise);
		//DS.getAll('countries')[0].countries=jasmine.createSpy('').and.returnValue(deferred.promise);


	}));
	it('should return homeAddress',function() {
		var address={
			"address1":"",
			"address2":"",
			"address3":"",
			"address4":"",
			"city":"",
			"country":"",
			"state":"",
			"postalCode":""
		}
		EditProfileEmergency._getHomeAddress(address);

	});

	it('_create  function test ', function () {
		EditProfileEmergency._create([{}, {}, {}, {}]);
		/*expect(DS.getAll).toHaveBeenCalled();
		deferred.resolve([
			{
				countries: [{key: value}, {key: 'value'}]
			}
		]);
		$scope.$digest();*/
	});

	it('_getDropdownData  function',function() {

		var countries=[{
			"countries":[{

			}]
		}];
		EditProfileEmergency._getDropdownData();
		/*expect(DS.getAll).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();*/

	});
	it("_adjust  functioion",function() {
		var data={
			"emergencyContacts":[{
				"id":"id",
				"name":{
					"lastName":"",
					"fullName":""
				},
				"uniqueId":"uniqueId"
			}],
			"deletedContacts":[{
				"id":"id"
			}]
		};
		EditProfileEmergency._adjust(data);


	});

	it('fetch function',function() {

		EditProfileEmergency.fetch();
		/*expect(DS.find).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();*/
	});
	/*it('delete function',function() {
		var form=[{
			"deletedContacts":{
			"name":{
				"fullName":"",
				"lastName":"",
			},
			"uniqueId":""
			}
		}];
		/!*stringUtil.format('{fullName}/{uniqueId}',{fullName:d.name.fullName,uniqueId:d.uniqueId})'*!/
		EditProfileEmergency.delete(form);
	});*/
	it('save function',function() {
		var data={
			"emergencyContacts":[{
				"id":"id",
				"name":{
					"lastName":"",
					"fullName":"",
				},
				"uniqueId":"uniqueId",
				"fullName":""
			}],
			"deletedContacts":[{
				"id":"id"
			}]
		};
		EditProfileEmergency.save(data);
		/*expect(DS.update).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();*/

	});

});
