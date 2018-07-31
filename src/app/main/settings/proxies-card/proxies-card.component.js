'use strict';

require('./proxies-card.component.scss');

module.exports = {
	template: require('./proxies-card.component.html'),
	controller: ['DS', '$uibModal', 'constants', '$filter', '$timeout' ,ProxiesCardController]
};

function ProxiesCardController(DS, $uibModal, constants, $filter, $timeout) {
	   var ctrl = this;
    // TODO: Re-factor to use ng-repeat.
        ctrl.$onInit = function () {
			ctrl.sectionName = 'proxy';
            ctrl.proxy = {};
			ctrl.addProxy = false;
		    ctrl.proxyList = [];
		    ctrl.historyList = [];
        	ctrl.showSpinner = true;
        	ctrl.showFullSpinner = false;
        	ctrl.showHistorySection = true;

    		DS.findAll('proxy').then(function (results) {
    		 ctrl.showSpinner = false;
			 ctrl.historyList = results[0].historyList;
			 ctrl.proxyList = results[0].activeList;
    		}).catch(function(error) {
    			//ctrl.errorMessage = error.data._statusText;
    		});
    	};

	ctrl.onCancelProxy = function () {
		ctrl.addProxy = false;
	};

	ctrl.deleteProxy = function(data) {
		ctrl.proxy = data;
		ctrl.prompt()
		  .then(ctrl.save).then(function(result) {

		 })
		 .catch(function(err) {
			ctrl.data = err.data;
		});
	};

	ctrl.prompt = function() {
			ctrl.confirmData = {};
    		ctrl.confirmData.messsage = 'proxy-confirm-message';
    		ctrl.confirmData.yesButton = 'preferences-card-email-toggle-true-label';
    		ctrl.confirmData.noButton = 'preferences-card-email-toggle-false-label';
    		var modal = $uibModal.open({
    			template  : '<tn-confirmation-model></tn-confirmation-model>',
    			component : 'tnproxyConfirmationModal',
    			resolve   : {
					data: function() { return angular.merge({}, ctrl.confirmData); }
				}
    		});

    		return modal.result;
    	};
	ctrl.save = function() {
		var options = {
			params: {
				effectiveDate: ctrl.proxy.effectiveDate
			}
		};
		DS.destroy('ProxyDelete', '', options).then(function(result) {
		   ctrl.data = { _statusCode: constants.statusCode,
						_statusMessage: $filter('translate')('proxy-delete-success')
					};
		   ctrl.reloadCard();
			  $timeout(function(){
				angular.element(document.querySelectorAll('#alertMessage button')).focus();
			});
		 }).catch(function(error) {
			ctrl.data = error.data;
        });
	};

	ctrl.reloadCard = function () {
		ctrl.sectionName = 'proxy';
		ctrl.proxy = {};
		ctrl.addProxy = false;
		ctrl.proxyList = [];
		ctrl.historyList = [];
		ctrl.showSpinner = true;
		ctrl.showFullSpinner = false;
		DS.find('proxy','').then(function (results) {
			ctrl.showSpinner = false;
			ctrl.historyList = results[0].historyList;
			ctrl.proxyList = results[0].activeList;
		}).catch(function(error) {
			ctrl.showSpinner = false;
			ctrl.showFullSpinner = false;
			if (error.status === 404) {
				ctrl.addProxy=false;
			}
		});
	}
}
