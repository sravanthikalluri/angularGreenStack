'use strict';

require('./preferences-card.component.scss');

module.exports = {
	template: require('./preferences-card.component.html'),
	controller: ['DS', '$uibModal','$q', 'gso', 'prefTypeMap', 'w2LabelMap', 'htmlTextMap', '$rootScope', 'utilService', '$timeout', PreferencesCardController]
};

/* @ngInject */
function PreferencesCardController(DS, $uibModal,$q, gso, prefTypeMap, w2LabelMap, htmlTextMap, $rootScope, utilService, $timeout) {
	var ctrl = this;

	// TODO: Re-factor to use ng-repeat.
    ctrl.$onInit = function () {
    	ctrl.showSpinner = true;
    	ctrl.showFullSpinner = false;
		ctrl.w2Label = w2LabelMap[gso.getAppConfig().countryCode];
		ctrl.showViewAdminSettings = false;
		ctrl.betaPref = 'N';

		DS.find('preferences','').then(function (results) {
            results.forEach(function(d) {
            	ctrl[prefTypeMap[d.preferenceType]] = (d.preferenceValue === 'Y');
				if (d.preferenceType === 'BETA_PREF') { // need to keep track of betaPref in order to control display of default view toggle
					ctrl.betaPref = d.preferenceValue;
				}
            });
			if (gso.getAppConfig().canViewAdminScreen !== undefined) {
				ctrl.showViewAdminSettings = gso.getAppConfig().canViewAdminScreen;
			}
			else {
				$rootScope.$on('menuLoad', function() {
					gso.getAppConfig().showViewAdminSettings =  utilService.checkForAdminView();
					ctrl.showViewAdminSettings = gso.getAppConfig().canViewAdminScreen;
				});
			}
			ctrl.showSpinner = false;
		}).catch(function(error) {
			ctrl.errorMessage = error.data._statusText;
		});
	};

	ctrl.onToggle = function(type, isToggled) {
		var text = htmlTextMap[type];
		var html = text ? (isToggled ? text.trueHtml : text.falseHtml) : undefined;
		var promise;

		ctrl[type] = isToggled;

		promise = html ? ctrl.confirm(type, isToggled, html) : ctrl.save(type, isToggled);
		if(promise){
			promise
				.then(function() {})
				.catch(function(err) { ctrl[type] = !ctrl[type]; });
		}
	};

	ctrl.confirm = function(type, isToggled, html) {
		var modal = $uibModal.open({
			template  : '<preferences-modal></preferences-modal>',
			component : 'preferencesModal',
			resolve   : { html: function() { return html; } }
		});

		return modal.result.then(function() { return ctrl.save(type, isToggled); });
	};

	ctrl.save = function(type, isToggled) {
		ctrl.data=null;
		ctrl.showFullSpinner = true;
		var data = {
			preferenceType  : Object.keys(prefTypeMap).filter(function(k) { return prefTypeMap[k] === type; })[0],
			preferenceValue : isToggled ? 'Y' : 'N'
		};
       DS.update('preferences', '', data).then(function (results) {
		   ctrl.data=results.response;
		   if (data.preferenceType === 'BETA_PREF') { // need to keep track of betaPref in order to control display of default view toggle
			   ctrl.betaPref = data.preferenceValue;
		   }
		   ctrl.showFullSpinner = false;
			$timeout(function(){
				angular.element(document.querySelectorAll('#alertMessage button')).focus();
			});
		}).catch(function(error) {
       		 ctrl.data=error.response;
       		 ctrl.showFullSpinner = false;
       	});
		//return DS.update('preferences', '', data);
	};
}
