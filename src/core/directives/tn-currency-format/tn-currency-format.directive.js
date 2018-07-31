/**
 * This directive is used to format the currency value with dollar symbol
 * Created by Ganesh on 12/06/2017.
 */
/* @ngInject */
module.exports = function ($filter) {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, elem, attrs, ctrl) {
			if (!ctrl) {
				return;
			}

			ctrl.$formatters.unshift(function () {
				return $filter(attrs.tnCurrencyFormat)(ctrl.$modelValue);
			});

			elem.on('blur',function () {
				var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
				elem.val($filter(attrs.tnCurrencyFormat)(plainNumber));
			});
		}
	}
};

