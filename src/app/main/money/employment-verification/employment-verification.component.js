'use strict';

require('./employment-verification.component.scss');

module.exports = {
	templateUrl: 'app/main/money/employment-verification/employment-verification.component.html',
	controller: ['DS','gso',EmploymentVerification]
};

/* @ngInject */
function EmploymentVerification(DS,gso) {
	var ctrl = this;
	ctrl.ambroseUser=gso.getAppConfig().peoId === 'AMB'?false:true;
	/* Employee Information fetched */
	ctrl.$onInit = function () {
		  if(ctrl.ambroseUser) {
			  DS.find('emp-verify', '').then(function (response) {
				  ctrl.verification = response;
			  }).catch(function (error) {
				  console.log('error is' + error);
			  });
		  }

	};
}
