'use strict';

module.exports = formsPoliciesService;

/* @ngInject */
function formsPoliciesService(DS, $q, gso) {
	var me = this;
		me._createArray = function() {
			return angular.merge({}, {
				forms             : DS.getAll('formsService')[0],
				policies          : DS.getAll('policiesService')[0],

			});
		};
		me.fetch = function() {
				var promises = [
				DS.find('formsService','companyForms?pfClient='+gso.getAppConfig().pfClient),
				DS.find('policiesService','/'+gso.getAppConfig().countryCode+'/'+gso.getAppConfig().stateCode+'/policies?pfClient='+gso.getAppConfig().pfClient),
				];

			return $q.all(promises).then(function (result) {
				var finalResponse = me._createArray();
				console.log(finalResponse);
				finalResponse.forms = finalResponse.forms.formsDetails.forms;
				finalResponse.policies = finalResponse.policies.policiesDetails;
				return finalResponse;
			});
		};
	return me;

}
