'use strict';

require('./security-card.component.scss');

module.exports = {
	template: require('./security-card.component.html'),
	controller: ['$uibModal', 'security', 'securityModalConfig', 'moment','$filter','$window',SecurityCardController]
};

/* @ngInject */
function SecurityCardController($uibModal, security, securityModalConfig, moment,$filter,$window) {
	var ctrl = this;
	ctrl.isVisibleSecurity = false;
	ctrl.$onInit = function() {
		if ($window.sessionStorage.getItem('personId')) {
			ctrl.isVisibleSecurity = true;
			ctrl.showSpinner = true;
			security.fetch()
				.then(ctrl.initItems)
				.catch(function(err) {
					ctrl.errorMessage = err.data._statusText;
				});
		} else {
			ctrl.isVisibleSecurity = false;
		}
	};

	ctrl.initItems = function(data) {
		data.secretQuestion.push({question:"Your own question"});
		var sublabels = {
			employeeId     : data.employeeId || $filter('translate')("security-card-employee-id-unavailable-label"),
			customId       : data.customId || $filter('translate')("security-card-custom-id-unavailable-label"),
			password       : $filter('translate')("Last changed on")+" " + moment(data.passwordDate).format('MMMM DD, YYYY'),
			secretQuestion : data.secretQuestion || $filter('translate')("security-card-secret-question-unavailable-label"),
			mfaPrimaryInfo : "Primary Contact Method : " +  data.primaryContact ,
			mfaSecondaryInfo : "Secondary Contact Method : " +  data.secondaryContact

	};

		ctrl.items = [
			{ name: undefined,                                          data: data, label: 'security-card-employee-id-label',       sublabel: sublabels.employeeId,     buttonLabel: undefined, buttonId:undefined,className:undefined },
			{ name: $filter('translate')("security-card-custom-ID"),    data: data, label: 'security-card-custom-id-label',         sublabel: sublabels.customId,       buttonLabel: 'security-card-custom-id-label', buttonId:'custID',className : 'custIDPwd' },
			{ name: $filter('translate')("security-card-password"),     data: data, label: 'security-card-password-label',          sublabel: sublabels.password,       buttonLabel: 'security-card-password-label', buttonId:'password',className : 'custIDPwd' },
			{ name: $filter('translate')("security-card-question"),     data: data, label: 'security-card-secret-question-label',   sublabel: sublabels.secretQuestion[0].question, buttonLabel: 'security-card-secret-question-label', buttonId:'secQueAns',className : 'secQueAns' },
			{ name: $filter('translate')("security-card-mfa"),     data: data, label: 'security-card-mfa-label',   sublabel: sublabels.mfaPrimaryInfo, sublabel2: sublabels.mfaSecondaryInfo,  buttonLabel: 'security-card-mfa-label', buttonId:'secMfa',className : 'secQueAns' }

		];
		ctrl.showSpinner = false;
	};

	ctrl.onButtonTap = function(item) {
		ctrl.prompt(item)
			.then(security.save).then(function(result) {
			  ctrl.data = result.response.data;
			}).then(ctrl.$onInit)
			.catch(function(err) {
				ctrl.data = err.data;
			});
	};

	ctrl.onOpenMfa = function(item) {
		// For Admin pass subject personid and employeeid as request paramters
		$window.open('./ui-mfa','TriNet-MFA','');
	};

	ctrl.prompt = function(item) {
		var config = securityModalConfig[item.name];
		var modal = $uibModal.open({
			template  : config.template,
			component : config.component,
			resolve   : {
				data: function() {
					return angular.extend({}, item.data, { name: item.name });
				}
			}
		});

		return modal.result;
	};
}
