'use strict';

require('./login.component.scss');

module.exports = {
	template: require('./login.component.html'),
	controller: ['$state', 'AuthenticationService',LoginController]
};

/** @ngInject */
function LoginController($state, AuthenticationService) {
	var ctrl = this;
	ctrl.incorrectCredentials = false;
	ctrl.activeTab = 0;

	var backgroundUrl = require("file!../../assets/images/login_background.png");
	ctrl.backgroundStyle = {
		background: 'url(' + backgroundUrl + ') no-repeat center/cover fixed'
	};

	ctrl.logins = [
		{name: 'login-employee-id', type: 'tel', input: '', digitsOnly: true, maxLength: 13},
		{name: 'login-ssn', type: 'password', input: '', digitsOnly: true, maxLength: 9},
		{name: 'login-custom-id', type: 'text', input: '', digitsOnly: false, maxLength: 256}
	];

	ctrl.onLogin = function() {
		switch(ctrl.activeTab) {
			case 0:
				AuthenticationService.performSignonWithEmployeeID(
					ctrl.logins[ctrl.activeTab].input,
					ctrl.password,
					function(response){handleLoginResponse(response)});
				break;

			case 1:
				AuthenticationService.performSignonWithSSN(
					ctrl.logins[ctrl.activeTab].input,
					ctrl.password,
					function(response){handleLoginResponse(response)});
				break;
			case 2:
				AuthenticationService.performSignonWithCustomID(
					ctrl.logins[ctrl.activeTab].input,
					ctrl.password,
					function(response){handleLoginResponse(response)});
				break;
		}
	};

	function handleLoginResponse(response) {
		if(response.success) {
			ctrl.incorrectCredentials = false;
			$state.go('app.main.dashboard');
		} else {
			ctrl.incorrectCredentials = true;
		}
	}
}
