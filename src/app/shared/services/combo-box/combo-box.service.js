'use strict';

module.exports = ComboBoxService;

/* @ngInject */
function ComboBoxService(DS) {
	return DS.defineResource({
			name: 'combo-box',
			idAttribute: 'id',
			basePath: 'assets/json',
			endpoint: 'combo-box.json',
			deserialize: function(resourceConfig, data) {
				var json = data.data;
				return{
					id: JSON.stringify(json),
					ethnicity: json.ethnicity,
					marriedStatus: json.marriedStatus,
					militaryStatus: json.militaryStatus,
					states: json.states,
					gender: json.gender
				}
			}
		});
}
