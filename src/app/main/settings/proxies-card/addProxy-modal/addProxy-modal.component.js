'use strict';

require('./addProxy-modal.component.scss');

module.exports = {
	template: require('./addProxy-modal.component.html'),
	controller: ['DS','moment','$window', '$timeout','gso', '$uibModal', AddProxyModalController],
	require: {
		parentCtrl: '^proxiesCard'
	},
	bindings:{
		modalInstance: '<',
		resolve: '<',
		onCancelProxy: '&'
	}
};

/* @ngInject */
function AddProxyModalController(DS,moment,$window, $timeout, gso, $uibModal) {
	var ctrl = this;
	var modalData = ctrl.resolve;
    ctrl.effectiveDate = moment().format('MM/DD/YYYY');
    ctrl.endDate=moment().format('MM/DD/YYYY');
	ctrl.maxDate = moment().add(60,'days').format('MM/DD/YYYY');
	ctrl.minDate = moment().subtract(30, 'days').format('MM/DD/YYYY');
    ctrl.data = {
		method: 'POST',
		payload: {
		    fullName: '',
            employeeId: $window.sessionStorage.getItem('empId')
		}
	};

	//Todo: Auto-populate the textbox data
	ctrl.$onInit = function () {
		ctrl.emplListLoading = true;
		DS.findAll('EmployeeDirectory').then(function (results) {
			var index = results.activeList.employees.findIndex(function(item){
				return item.employeeId ===gso.getAppConfig().userId;
			});
			results.activeList.employees.splice(index, 1);
			ctrl.globalActiveEmp = results.activeList.employees;
			ctrl.emplListLoading = false;
		}).catch(function(error) {
		   //ctrl.errorMessage = error.data._statusText;
	  });

	};
    ctrl.onCancel = function() {
    	ctrl.onCancelProxy({});
    };

  ctrl.onSelect = function (item) {
		ctrl.emaildata = gso.getUtilService().emailValidity(item.work_email);
		ctrl.data.payload.firstName = item.firstName;
		ctrl.data.payload.lastName = item.lastName;
		ctrl.data.payload.proxyId=item.employeeId;

		ctrl.dataForModal = {
			firstName: ctrl.data.payload.firstName,
			lastName: ctrl.data.payload.lastName
		};

		if(!ctrl.emaildata){
			var modalInstance = $uibModal.open({
				template: '<tn-proxy-message-modal></tn-proxy-message-modal>',
				component: 'tnProxyMessageModal',
				backdrop: 'static',
				resolve: {
					modalData: function() {
						return ctrl.dataForModal;
					}
				}
			});
			modalInstance.result.then(function () { // then pass that value to function that checks for admin/EE view preference
				$window.sessionStorage.setItem('switchViewModalViewedAndClosed', true);
			});
	}


	};

    ctrl.onSave = function(formName) {
       ctrl.data.payload.effectiveDate = moment(ctrl.effectiveDate).format('YYYY-MM-DD');
       ctrl.data.payload.endDate = moment(ctrl.endDate).format('YYYY-MM-DD');
	   ctrl.showFullSpinner = true;
	    if (formName.$valid) {
			DS.create('proxy', ctrl.data.payload).then(function (results) {
				ctrl.errorData=results.response;
				ctrl.showFullSpinner = false;
				ctrl.callParentReloadCard()
				$timeout(function(){
					angular.element(document.querySelectorAll('#alertMessage button')).focus();
				});
			 }).catch(function(error) {
				ctrl.errorData=error.data;
				ctrl.showFullSpinner = false;
				$timeout(function(){
					angular.element(document.querySelectorAll('#alertMessage button')).focus();
				});
			});
		}
	}

	ctrl.callParentReloadCard = function(){
		$timeout( function() {
			ctrl.parentCtrl.reloadCard();
		}, 2000);
	}
}
