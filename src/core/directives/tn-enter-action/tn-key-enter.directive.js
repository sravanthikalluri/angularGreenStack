'use strict';

module.exports = function () {
	return {
		restrict: 'A',
		link: function (scope, ele, attrs, ctrl) {
			ele.bind('keydown keypress', function (event) {
				if (event.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.tnEnter);
					});
					event.preventDefault();
				}
			});
		}
	}
}
