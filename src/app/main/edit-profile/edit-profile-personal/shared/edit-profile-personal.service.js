'use strict';

module.exports = EditProfilePersonalService;

/* @ngInject */
function EditProfilePersonalService($q, $filter, DS, US_STATES, CA_PROVINCES, moment, profileUrlConfig, gso, $uibModal) {
	var effectiveDate = moment().format('YYYY-MM-DD');
	var me = this;

	// Private Methods
	me._getDropdownData = function(data) {
		var militaryStatuses = DS.getAll('military-statuses').length === 0 ? [] : DS.getAll('military-statuses')[0].militaryStatus,
			maritalStatuses = DS.getAll('marital-statuses').length === 0 ? [] : DS.getAll('marital-statuses')[0].marriedStatus,
			ethnicities = DS.getAll('ethnicities').length === 0 ? [] : DS.getAll('ethnicities')[0] && DS.getAll('ethnicities')[0].ethnicity;
		return {
			dropdown: {
				usStates         : US_STATES,
				caProvinces      : CA_PROVINCES,
				countries        : DS.getAll('countries')[0].countries,
				genders          : DS.getAll('genders')[0].genders,
				maritalStatuses  : maritalStatuses,
				militaryStatuses : militaryStatuses,
				ethnicities      : ethnicities
			},
			selected: {
				state: data.address ? US_STATES.filter(function(d) { return d.key === data.address[0].state; })[0] : null,
				province: data.address ? CA_PROVINCES.filter(function(d) { return d.key === data.address[0].state; })[0] : null,
				country: data.address ? DS.getAll('countries')[0].countries.filter(function(d) { return d.key === (data.address[0].country || gso.getAppConfig().countryCode); })[0] : null,
				gender: data.personalInfo ? DS.getAll('genders')[0].genders.filter(function(d) { return d.key === data.personalInfo.gender; })[0] : null,
				maritalStatus: data.personalInfo ? maritalStatuses.filter(function(d) { return d.key === data.personalInfo.maritalStatus; })[0] : null,
				militaryStatus: data.personalInfo ? militaryStatuses.filter(function(d) { return d.key === data.personalInfo.militaryStatus; })[0] : null,
				ethnicity: data.personalInfo ? ethnicities.filter(function(d) { return d.key === data.personalInfo.ethnicity; })[0] : null
			}
		};
	};

	me._getAddress = function(arr) {
		return arr;
	};

	me._getPersonalInfo = function(personalInfo, ssn, citizenship) {
		return angular.extend({}, personalInfo, {
			effectiveDate     : effectiveDate,
			citizenship       : ssn.nationalIds.country,
			citizenshipStatus : (citizenship && citizenship.workEligibility)? citizenship.workEligibility.citizenshipStatus : ' ',
			ssnId             : ssn.nationalIds.id
		});
	};

	// Creates the form
	me._create = function(results) {
		var data = angular.extend({}, {
			address        : me._getAddress(results[0]),
			personalInfo   : me._getPersonalInfo(results[1], results[2], results[3])
		});

		return angular.extend(data, me._getDropdownData(data));
	};

	// Adjusts the form.  Called before saving
	me._adjust = function(data) {
		var form = angular.copy(data);

		angular.extend(form.address, {
			stateProvince         : form.address.state,
			stateProvinceCodeDesc : $filter('state')(form.address.state)
		});

		return form;
	};

	// Public Methods
	me.fetch = function() {
		var promises = [
			DS.find('address', ''),
			DS.find('personalInfo', ''),
			DS.find('ssn', ''),
			DS.find('citizenship', '')
		];

		return $q.all(promises).then(me._create);
	};

	me.save = function(form, formName, ctrl) {
		var form = me._adjust(form);
		form.address.effectiveDate = form.address.effectiveDate.indexOf('/') !== -1 ? moment(form.address.effectiveDate, "MM-DD-YYYY").format('YYYY-MM-DD') : moment(form.address.effectiveDate, "YYYY-MM-DD").format('YYYY-MM-DD');
		var promises = [];

		if (formName.homeAddressSectionForm.$dirty) {
			promises.push(DS.update('address', '', form.address));
		}

		if (formName.personalIdSectionForm.$dirty || formName.personalstatusSectionForm.$dirty) {
			gso.getAppConfig().countryCode === 'CA' ? delete form.personalInfo.ethnicity : '';
			delete form.personalInfo.employeeId;
			delete form.personalInfo.citizenship;
			delete form.personalInfo.citizenshipStatus;
			delete form.personalInfo.ssnId;
			form.personalInfo.militaryStatus = form.personalInfo.militaryStatus ? form.personalInfo.militaryStatus : '2';
			promises.push(DS.update('personalInfoSelf', '', form.personalInfo));
		}

		// On success, we also eject the emergencyContacts cache in case the home address changed.

		if(promises.length === 0){
			ctrl.showFullSpinner = false;
			var confirmData = {};
			confirmData.messsage = 'edit-profile-no-changes';
			confirmData.yesButton = 'preferences-card-email-toggle-true-label';
			confirmData.noButton = 'preferences-card-email-toggle-false-label';
			confirmData.profile = 'profile-title';
			var modal = $uibModal.open({
				template  : '<tn-confirmation-model></tn-confirmation-model>',
				component : 'tnproxyConfirmationModal',
				resolve   : {
					data: function() { return angular.merge({}, confirmData); }
				}
			});

			return modal.result;
		}else{
			return $q
				.all(promises)
				.then(function() { DS.bulkEjectAll(['address', 'personalInfo', 'emergencyContacts']); });
		}
	};

	me.delete = function(form, formName) {
		var form = me._adjust(form);
		form.address.effectiveDate = form.address.effectiveDate.indexOf('/') !== -1 ? moment(form.address.effectiveDate, "MM-DD-YYYY").format('YYYY-MM-DD') : moment(form.address.effectiveDate, "YYYY-MM-DD").format('YYYY-MM-DD');
		var promises = [];

		if (form.deletedAddresses.length) {
			form.deletedAddresses.map(function(d) {
				d.effectiveDate = d.effectiveDate.indexOf('/') !== -1 ? moment(d.effectiveDate, "MM-DD-YYYY").format('YYYY-MM-DD') : moment(d.effectiveDate, "YYYY-MM-DD").format('YYYY-MM-DD');
				delete d.fullAddressHtml;
				delete d.stateProvince;
				delete d.stateProvinceCodeDesc;
				promises.push(DS.destroy('address', d.effectiveDate, { headers: { 'Content-Type': 'application/json;charset=UTF-8'}, data: d }));
			});
		}

		// On success, we also eject the emergencyContacts cache in case the home address changed.

		if(promises.length === 0){
			var confirmData = {};
			confirmData.messsage = 'edit-profile-no-changes';
			confirmData.yesButton = 'preferences-card-email-toggle-true-label';
			confirmData.noButton = 'preferences-card-email-toggle-false-label';
			confirmData.profile = 'profile-title';
			var modal = $uibModal.open({
				template  : '<tn-confirmation-model></tn-confirmation-model>',
				component : 'tnproxyConfirmationModal',
				resolve   : {
					data: function() { return angular.merge({}, confirmData); }
				}
			});

			return modal.result;
		}else{
			return $q
				.all(promises)
				.then(function() { DS.bulkEjectAll(['address', 'personalInfo', 'emergencyContacts']); });
		}
	};

	return me;
}
