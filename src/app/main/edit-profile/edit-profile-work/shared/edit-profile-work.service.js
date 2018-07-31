'use strict';

module.exports = EditProfileWorkService;

/* @ngInject */
function EditProfileWorkService($q, $filter, DS, moment) {
	var today = moment().format('YYYY-MM-DD');
	var me = this;

	me._getDropdownData = function(data) {
		return {
			dropdown: {
				suffixes        : DS.getAll('suffixes'),
				formOfAddresses : DS.getAll('formOfAddress'),
				accessTypes     : DS.getAll('accessTypes')
			},
			selected: {
				primarySuffix: data.primary ? DS.getAll('suffixes').filter(function(d) { return d.key === data.primary.suffix; })[0] : null,
				preferredSuffix: data.preferred ? DS.getAll('suffixes').filter(function(d) { return d.key === (data.preferred ? data.preferred.suffix : ''); })[0] : null,
				primaryFormOfAddress: data.primary ? DS.getAll('formOfAddress').filter(function(d) { return d.key === data.primary.formOfAddress; })[0] : null,
				preferredFormOfAddress: data.preferred ? DS.getAll('formOfAddress').filter(function(d) { return d.key === (data.preferred ? data.preferred.formOfAddress : ''); })[0] : null
			}
		};
	};

	// This will place all the work contacts at the beginning of the contacts array.
	me._getContacts = function(contacts) {
		var work = contacts.filter(function(d) { return d.accessType === 'Work'; });
		var notWork = contacts.filter(function(d) { return d.accessType !== 'Work'; });

		return work.concat(notWork);
	};

	me._create = function(results) {
		var data = angular.extend({}, {
			primary   : results[0].primary,
			preferred : results[0].preferred,
			contacts  : me._getContacts(results[1]),
			initials  : results[0].initials
		});

		return angular.extend(data, me._getDropdownData(data));
	};

	me._adjust = function(data) {
		var form = angular.copy(data);

		// Modify Primary name
		form.primary.effectiveDate = today;

		// Modify Preferred name
		form.preferred ? form.preferred.effectiveDate = today : angular.noop();

		// Modify contacts
		form.contacts.forEach(function(d) {
			// Remove this custom id field as API doesn't accept it
			delete d.id;

			// Strip out non-numeric characters from phone.  Need to do this due to some issue with ngMask.
			d.telephoneNumber = d.telephoneNumber ? d.telephoneNumber.replace(/\D/g,'') : '';
		});

		return form;
	};

	me.fetch = function() {
		var promises = [
			DS.find('names', ''),
			DS.find('contacts', '', {
				params: {
					excludehistory: true
				}
			})
		];

		return $q.all(promises).then(me._create);
	};

	me.save = function(data, formName) {
		// /contacts requires special URL params for /PUT.  Otherwise, 'deleting' doesn't work.
		var contactOptions = {
			params: {
				operation        : 'all',
				enableValidation : true
			}
		};

		var form = me._adjust(data);
		var promises = [];
		// sending respective service calls.
		if (formName.primaryNameSectionForm.$dirty) {
			promises.push(DS.update('names', '', form.primary));
		}

		if (formName.contactSectionForm.$dirty) {
			promises.push(DS.update('contacts', '', { contactList: form.contacts }, contactOptions));
		}

		if (form.preferred && form.preferred.firstName && form.preferred.lastName && formName.preferredNameSectionForm.$dirty) {
			if (typeof form.preferred.firstName === 'string' && form.preferred.firstName.trim() !== '' && typeof form.preferred.lastName === 'string' && form.preferred.lastName.trim() !== '') {
				promises.push(DS.update('names', '', form.preferred));
			}
		}

		return $q
			.all(promises)
			.then(function() { DS.bulkEjectAll(['names', 'contacts']); });
	};

	return me;
}
