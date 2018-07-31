'use strict';

module.exports = function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
        /*element.val(scope.model);
			scope.$watch('model', function (newVal, oldVal) {
				if (newVal !== oldVal) {
					element.val(scope.model);
				}
			});

			$timeout(function () {
				element.remove();
			}, 10000);*/
        }
	}
};
