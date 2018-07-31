'use strict';

/* @ngInject */
module.exports = function (){
	return function(scope, elm, attr,ctrl) {
		var raw = elm[0];
		elm.bind('scroll', function() {
			if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
				scope.$apply(attr.tnScroll);
			}
		});
	};
};
