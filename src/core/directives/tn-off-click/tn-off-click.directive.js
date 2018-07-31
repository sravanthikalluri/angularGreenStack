'use strict';

/* @ngInject */
module.exports = function ($document){
	return {
		restrict: 'A',
		link: function(scope, elem, attr, ctrl) {
			  var elemClickHandler = function(e) {
			    e.stopPropagation();
			  };

			  var docClickHandler = function() {
			    scope.$apply(attr.tnOffClick);
			  };

			  elem.on('click', elemClickHandler);
			  $document.on('click', docClickHandler);
			  elem.on('scroll', elemClickHandler);
			  $document.on('scroll', docClickHandler);

			  scope.$on('$destroy', function() {
			    elem.off('click', elemClickHandler);
			    $document.off('click', docClickHandler);
			    elem.on('scroll', elemClickHandler);
			  	$document.on('scroll', docClickHandler);
			});
		}
	}
};
