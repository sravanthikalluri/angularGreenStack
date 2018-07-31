'use strict';

module.exports = EditProfileEmergencyService;

/* @ngInject */
function EditProfileEmergencyService($q, DS, US_STATES, CA_PROVINCES, stringUtil) {
	var me = this;

	me._getDropdownData = function(form) {
		return {
			dropdown: {
				usStates      : US_STATES,
				caProvinces   : CA_PROVINCES,
				countries     : DS.getAll('countries')[0].countries,
				relationships : DS.getAll('relation-ships')[0].relationShips,
			},
			selected: {}
		};
	};

	// Returns a home address structure that matches the /emergency-contacts json instead of the
	// /addresses json.  We'll use this in the UI for the "Same Address as Employee" checkbox.
	me._getHomeAddress = function(address) {
		address = Array.isArray(address) ? address[0] : address;
		return angular.extend({}, {
			address1   : address.address1,
			address2   : address.address2,
			address3   : address.address3,
			address4   : address.address4,
			city       : address.city,
			country    : address.country,
			county     : address.country,
			state      : address.state,
			postalCode : address.postalCode
		});
	};

	me._adjust = function(data) {
		var form = angular.copy(data);


		form.emergencyContacts.forEach(function(d) {
			// Delete extra js-data field so API can accept
			delete d.id;

			// Will allow the contact to be identified as 'New'.
			if(d.uniqueId){
				if (d.uniqueId.toString().indexOf('NEW') > 0) {
					d.uniqueId = null;
				}
			}

			// API firstName, middleName, and lastName need to be filled out?
			angular.extend(d.name, {
				firstName  : d.name.lastName,
				middleName : d.name.lastName,
				fullName   : d.name.fullName ? d.name.fullName : d.name.lastName
			});
		});

		form.deletedContacts.forEach(function(d) {
			// Delete extra js-data field so API can accept
			delete d.id;
		});

		return form;
	};

	me._create = function(results) {
		var form = angular.merge({}, {
			emergencyContacts : results ? results[0] : [],
			deletedContacts   : [],
			homeAddress       : results ? me._getHomeAddress(results[1]) : me._getHomeAddress(DS.getAll('address')[0]),
		});

		return angular.extend(form, me._getDropdownData(form));
	};

	me.fetch = function() {
		var promises = [
			DS.findAll('emergencyContacts'),
			DS.find('address', '')
		];

		return $q.all(promises).then(me._create);
	};

	me.delete = function(form) {
		var promises = form.deletedContacts.map(function(d) {
			var id = stringUtil.format('{fullName}/{uniqueId}', {
				fullName : d.name.fullName,
				uniqueId : d.uniqueId
			});

			return DS.destroy('emergencyContacts', id, d);
		});

		return $q.all(promises);
	};

	me.save = function(data) {
		var form = me._adjust(data);

		// Emergency Contact API only allows one PUT request at a time so we bundle
		// up all updates and fire them in parallel.
		var promises = form.emergencyContacts.map(function(d) {
			if (!d.uniqueId) {
				delete d.name.firstName;
				delete d.name.middleName;
				delete d.name.lastName;
				return DS.create('emergencyContacts', d);
			} else {
				delete d.name.firstName;
				delete d.name.middleName;
				delete d.name.lastName;
				return DS.update('emergencyContacts', '', d);
			}
		});

		// PUT/POST the contacts first in case the Primary Contact changed
		// Then delete contacts from the deletedContacts list
		return $q.all(promises)
			.then(function() { return me.delete(form); })
			.then(function() { return DS.ejectAll('emergencyContacts'); });
	};

	return me;
}
