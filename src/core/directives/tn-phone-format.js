/* @ngInject */
module.exports = function ($filter) {
	function link(scope, element, attributes) {

		// scope.inputValue is the value of input element used in template
		scope.inputValue = scope.phonenumberModel;

		scope.$watch('inputValue', function(value, oldValue) {

			value = String(value);
			var number = value.replace(/[^0-9]+/g, '');
			scope.phonenumberModel = number;
			scope.inputValue = $filter('phonenumber')(number);
		});

		scope.changePhone = function (inputValue) {
			scope.onChange({inputValue: inputValue});
		}
	}
	return {
		link: link,
		restrict: 'E',
		scope: {
			phonenumberPlaceholder: '=placeholder',
			phonenumberModel: '=model',
			isRequired: '=',
			isFormSubmitted: '=',
			onChange: '&'
		},
		//templateUrl: '/static/phonenumberModule/template.html',
		template: '<input class="is-phone" ng-class="{\'is-invalid\': (isInputTouched && isRequired && inputValue.length == 0)}" id="phone" ng-keyup="changePhone(inputValue)" ng-model="inputValue" ' +
				'maxlength="24" type="tel" placeholder="{{phonenumberPlaceholder}}" ng-blur="isInputTouched = true" ' +
				'ng-focus="isInputTouched = true" ng-required="isRequired" title="Phonenumber (Format: (999) 9999-9999)">' +
				'<div class="tn-input-error">' +
				'<div ng-show="isInputTouched && isRequired && inputValue.length == 0" aria-live="polite">Required.</div> </div>'
	}
};
