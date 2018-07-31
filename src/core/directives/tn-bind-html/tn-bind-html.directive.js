'use strict';

module.exports = /*@ngInject*/function($compile) {
	return {
		restrict: 'E',
		link: function(scope, element, attr) {
		   scope.$watch(
			   function (scope) {
				   // watch the 'compile' expression for changes
				   return scope.$eval(attr.content);
			   },
			   function (value) {
				   // when the 'compile' expression changes
				   element.html(value);
				   $compile(element.contents())(scope);
			   }
		   );

		}
	}
}
