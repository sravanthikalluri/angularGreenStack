'use strict';

module.exports = SecurityService;

/* @ngInject */
function SecurityService(DS, $q, $filter) {
	var me = this;

	me.fetch = function() {
		var promises = [
			DS.find('customId', ''),
			DS.find('secretQuestion', ''),
			DS.find('securityMfa', '')
		];

		return $q.all(promises).then(function(results) {
			var customId = results[0];
			var secretQuestion = results[1];
			var securityMfa = results[2];
			var secure2 = "N/A";
			var secure1 = "N/A";
			if ( securityMfa != null && securityMfa.secure != null ) {
				secure1 = securityMfa.secure;
				if ( secure1.indexOf("?") == -1 ) {
					secure1 = $filter('telMfaFormat')(secure1);
				}
			}
			
			if ( securityMfa != null && securityMfa.secure2 != null ) {
				secure2 = securityMfa.secure2;
				if ( secure1.indexOf("?") == -1 ) {
					secure2 = $filter('telMfaFormat')(secure2);
				}
			}
			return {
				employeeId     : customId.password.employeeId,
				customId       : customId.customId,
				passwordDate   : customId.password.effectiveDate,
				secretQuestion : secretQuestion,
				primaryContact : secure1,
				secondaryContact : secure2
			};
		});
	};

	me.save = function(data) {
		var promise;

		switch (data.method) {
			case 'PUT':
				promise = DS.update(data.name, '', data.payload);
				break;
			case 'POST':
				promise = DS.create(data.name, data.payload);
				break;
			default:
				console.log('Unknown Method');
				break;
		}

		return promise;
	};

	return me;
}
