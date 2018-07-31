'use strict';

module.exports = DaysFromNowFilter;

/* @ngInject */
function DaysFromNowFilter(moment) {
	return function(dateString) {
		if(dateString !== undefined){
			var today = new Date();
			var difference = moment(dateString).diff(moment(today.toDateString()).utc());
			var numberOfMilliseconds = 24*60*60*1000;
			var numberOfdays = Math.floor(difference/numberOfMilliseconds);
			if(numberOfdays === 1){
				return "In "+numberOfdays+" day";
			}
			else if (numberOfdays < 0){
				return -numberOfdays + " days ago";
			}
			else if(numberOfdays === 0){
				return "Today";
			}
			else{
				return "In "+numberOfdays+" days";
			}
		}
	};
}
