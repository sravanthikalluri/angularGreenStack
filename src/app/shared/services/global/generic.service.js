'use strict';
module.exports = genericService;
/* @ngInject */
function genericService(DS, gso) {
	return {
		formOfAddress: fetchFormOfAddress,
		suffix: fetchSuffixes,
		countries: fetchCountries,
		accessTypes: fetchAccessTypes,
		relationShips: fetchRelationShips,
		states: fetchStates,
		maritalStatus: fetchMaritalStatus,
		gender: fetchGenders,
		addressTypes: fetchAddressTypes,
		media: fetchMedia,
		militaryStatus: fetchMilitaryStatus,
		ethnicity: fetchEthnicity
	};

	function fetchFormOfAddress() {
		DS.findAll('formOfAddress');
	}

	function fetchSuffixes() {
		DS.findAll('suffixes');
	}

	function fetchCountries() {
		DS.find('countries', '');
	}

	function fetchAccessTypes() {
		DS.findAll('accessTypes');
	}

	function fetchRelationShips() {
		DS.find('relation-ships', '');
	}

	function fetchStates() {
		DS.find('states', gso.getAppConfig().countryCode + '/states');
	}

	function fetchMaritalStatus() {
		DS.find('marital-statuses', '');
	}

	function fetchGenders() {
		DS.find('genders', '');
	}

	function fetchAddressTypes() {
		DS.find('address-types', '');
	}

	function fetchMedia() {
		DS.find('media-types', '');
	}

	function fetchMilitaryStatus() {
		DS.find('military-statuses', '');
	}

	function fetchEthnicity() {
		DS.find('ethnicities', '');
	}
}
