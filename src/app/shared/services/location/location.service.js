'use strict';

module.exports = LocationService;

/* @ngInject */
function LocationService(DS) {
	var me = this;

	me.init = function() {
		//calls profile service to get work address of user
		DS.find('address','').then(function(results){
			return results;
		}).then(function(result){
			var workAddressLine1 = result.address1;
			var workAddressLine2 = result.address2;
			var workCity = result.city;
			var workState = result.state;
			var workPostal = result.postalCode;
			return DS.defineResource({
				name: 'location',
				idAttribute: 'id',
				basePath: 'https://maps.googleapis.com',
				endpoint: 'maps/api/geocode/json?address='+workAddressLine1+','+workCity+','+workState+'&key=AIzaSyAG41vi29rdgPUM-pSdcC5oZMcXl4o-Ekc',
				deserialize: function(resourceConfig, data) {
					var json = data.data;
					return {
						id: JSON.stringify(json),
						latitude: json.results[0].geometry.location.lat,
						longitude: json.results[0].geometry.location.lng,
						workAddressLine1: workAddressLine1,
						workAddressLine2: workAddressLine2,
						workCity: workCity,
						workState: workState,
						workPostal: workPostal
					};
				}
			});
		});
	};

	return me;
}
