'use strict';

require('./personal-id-section.component.scss');

module.exports = {
	template: require('./personal-id-section.component.html'),
	controller: ['$uibModal', '$timeout', PersonalIdSectionController],
	bindings: {
		data: '<',
		formName: '<',
		onUpdate: '&'
	}
};

/* @ngInject */
function PersonalIdSectionController($uibModal, $timeout) {
	var ctrl = this;
	ctrl.$onInit = function() {
		$timeout(function () {
			ctrl.formName.$setPristine();
		}, 1000);
		ctrl.keys = {
			dob       : 'birthDate',
			gender    : 'gender',
			ethnicity : 'ethnicity',
			ssn       : 'ssnId',
			militaryStatus:'militaryStatus'

		};

		ctrl.ethnicity = { isDeclined:  (ctrl.data.selected.ethnicity.key === 'NSPEC') ? true : false};
	};

	ctrl.update = function(prop, value) {
		ctrl.onUpdate({ prop: prop, value: value });
	};

	ctrl.checkEthnicity = function() {
		console.log('ctrl.confirm', ctrl.confirm);
		if (ctrl.ethnicity.isDeclined) {
			ctrl.confirm()
				.then(function() {
					ctrl.data.selected.ethnicity = ctrl.data.dropdown.ethnicities.find(function (obj) {
						return obj.key === 'NSPEC';
					});
					ctrl.update('ethnicity', ctrl.data.selected.ethnicity.key);
				})
				.catch(function() { ctrl.ethnicity.isDeclined = !ctrl.ethnicity.isDeclined; });
		}
	};

	ctrl.confirm = function() {
		var modal = $uibModal.open({
			template  : '<ethnicity-modal></ethnicity-modal>',
			component : 'ethnicityModal'
		});

		return modal.result;
	}
}
