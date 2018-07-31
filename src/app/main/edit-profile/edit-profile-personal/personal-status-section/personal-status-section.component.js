'use strict';

require('./personal-status-section.component.scss');

module.exports = {
	template: require('./personal-status-section.component.html'),
	controller: PersonalStatusSectionController,
	bindings: {
		data: '<',
		formName: '<',
		onUpdate: '&'
	}
};

function PersonalStatusSectionController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.keys = {
			maritalStatus    : 'maritalStatus',
			militaryStatus   : 'militaryStatus',
			citizenship      : 'citizenship',
			disabilityStatus : 'disabilityStatus'
		};

		ctrl.disabilityStatus = { text: 'This field is not used' };
	};

	ctrl.update = function(prop, value) {
		ctrl.onUpdate({ prop: prop, value: value });
	};
}
