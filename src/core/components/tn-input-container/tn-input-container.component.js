'use strict';

require('./tn-input-container.component.scss');

module.exports = {
	template: require('./tn-input-container.component.html'),
	transclude: true,
	controller: ['$element', '$timeout',TnInputContainerController]
};

/* @ngInject */
function TnInputContainerController($element, $timeout) {
	var ctrl = this;

	ctrl.$postLink = function() {
		var input = $element.find('input');
		var select = $element.find('select');

		var focusedCls = 'is-focused';
        var requiredCls = 'is-required';

        if (input.length > 0) {
            input.on('focus', function(e) { $element.addClass(focusedCls); });
            input.on('blur', function(e) { $element.removeClass(focusedCls); });

            // Hack -- Waits for the next digest cycle(?) so that the child components
            // are compiled first before calling $element.addClass() on the <input>
            $timeout(function() {
            	$element.addClass(input.attr('required') === 'required' ? requiredCls : '');
            });
        }

        if (select.length > 0) {
            $timeout(function() {
            	$element.addClass(select.attr('required') === 'required' ? requiredCls : '');
            });
        }
	};
}
