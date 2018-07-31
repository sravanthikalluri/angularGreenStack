'use strict';

require('./tn-sso.component.scss');

module.exports = {
	template: require('./tn-sso.component.html'),
	controller: ['$stateParams', '$window',DashboardController]
};

/* @ngInject */
function DashboardController($stateParams, $window) {
	var ctrl = this;

	ctrl.ssoParams = $stateParams;
	$window.sessionStorage.setItem('ssoId', angular.fromJson($stateParams).ssoId);
}
