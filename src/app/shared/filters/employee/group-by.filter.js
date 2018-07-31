
'use strict';
module.exports = groupBy;

/* @ngInject */
 function groupBy($timeout) {
	 return _.memoize(function(items, field) {
                 return _.groupBy(items, field);
         }
     );
}


