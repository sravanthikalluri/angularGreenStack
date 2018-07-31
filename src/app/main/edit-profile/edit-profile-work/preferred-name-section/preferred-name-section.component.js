'use strict';

require('./preferred-name-section.component.scss');

module.exports = {
	template: require('./preferred-name-section.component.html'),
	controller: ['$compile','$scope', PreferredNameSectionController],
	bindings: {
		formName: '<',
		data: '<',
		onUpdate: '&',
		primarychanged: '='

	}
};

function PreferredNameSectionController($compile,$scope) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.keys = {
			formOfAddress : 'formOfAddress',
			firstName     : 'firstName',
			middleName    : 'middleName',
			lastName      : 'lastName',
			suffix        : 'suffix'
		};


		// isPreferredPrimary
		if (ctrl.data.preferred && ctrl.data.primary) {
			if ((ctrl.data.primary.firstName === ctrl.data.preferred.firstName) &&
				(ctrl.data.primary.middleName === ctrl.data.preferred.middleName) &&
				(ctrl.data.primary.lastName === ctrl.data.preferred.lastName) &&
				((ctrl.data.selected.preferredSuffix ==undefined && ctrl.data.selected.primarySuffix ==undefined)||(ctrl.data.selected.preferredSuffix?ctrl.data.selected.preferredSuffix.key:"pre" === ctrl.data.selected.primarySuffix?ctrl.data.selected.primarySuffix.key:"pri")) &&
				((ctrl.data.selected.primaryFormOfAddress==undefined && ctrl.data.selected.preferredFormOfAddress==undefined)||(ctrl.data.selected.primaryFormOfAddress?ctrl.data.selected.primaryFormOfAddress.key:"pri" === ctrl.data.selected.preferredFormOfAddress?ctrl.data.selected.preferredFormOfAddress.key:"pre"))) {
				ctrl.data.isPreferredPrimary = true;
			} else {
				ctrl.data.isPreferredPrimary = false;
			}
		}
	};
	$scope.$watch('$ctrl.primarychanged', function() {
		if (ctrl.data.preferred && ctrl.data.primary && ctrl.primarychanged && ctrl.data.isPreferredPrimary) {
			updatePreferredSectionDOM();
		}
		else{
			ctrl.primarychanged=false;
		}
	}, true);

	var count = 0;
	function updatePreferredSectionDOM() {
		ctrl.formName.$dirty=true;
		ctrl.update('firstName', ctrl.data.primary.firstName);
		ctrl.update('middleName', ctrl.data.primary.middleName);
		ctrl.update('lastName', ctrl.data.primary.lastName);
		ctrl.data.selected.preferredFormOfAddress = angular.copy(ctrl.data.selected.primaryFormOfAddress);
		ctrl.data.selected.preferredSuffix = angular.copy(ctrl.data.selected.primarySuffix);
		ctrl.update('suffix', ctrl.data.selected.preferredSuffix ? ctrl.data.selected.preferredSuffix.key:null);
		ctrl.update('formOfAddress', ctrl.data.selected.preferredFormOfAddress?ctrl.data.selected.preferredFormOfAddress.key:null);
		var content = angular.element('#preferred');
		var scope = content.scope();
		$compile(content.contents())(scope);
		ctrl.primarychanged=false;
	}

	ctrl.getPrimaryInfo = function (bool) {
		if (ctrl.data.isPreferredPrimary && !count) {
			count++;
			updatePreferredSectionDOM();
		}
		if (ctrl.data.isPreferredPrimary && ((angular.element('#preferredFirstNameInput').val() === '') || (angular.element('#preferredMiddleNameInput').val() === '') || (angular.element('#preferredLastNameInput').val() === ''))) {
			updatePreferredSectionDOM();
		}

		if (ctrl.data.isPreferredPrimary &&
			(
				(ctrl.data.primary.firstName !== ctrl.data.preferred.firstName) ||
				(ctrl.data.primary.middleName !== ctrl.data.preferred.middleName) ||
				(ctrl.data.primary.lastName !== ctrl.data.preferred.lastName) ||
				(ctrl.data.selected.primaryFormOfAddress?ctrl.data.selected.primaryFormOfAddress.key:undefined !== ctrl.data.selected.preferredFormOfAddress?ctrl.data.selected.preferredFormOfAddress.key:undefined) ||
				((ctrl.data.selected.preferredSuffix?ctrl.data.selected.preferredSuffix.key:undefined !==ctrl.data.selected.primarySuffix? ctrl.data.selected.primarySuffix.key:undefined)))
			)
			{
				updatePreferredSectionDOM();
			}
	};

	ctrl.update = function(prop, value) {
		ctrl.onUpdate({ prop: prop, value: value });
	};
}
