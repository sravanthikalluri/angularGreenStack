'use strict';

require('./team-calendar-card.component.scss');

module.exports = {
	templateUrl: 'app/main/team/team-calendar-card/team-calendar-card.component.html',
	controller: teamCalendarCardController
};

/* @ngInject */
function teamCalendarCardController() {
	var ctrl = this;
	ctrl.currentDate = 0;
	ctrl.leaveData = [
	{
		date: "Today",
		employees: [
			{ name: "Bertram G.", url:"http://www.piedpiper.com/app/themes/pied-piper/dist/images/gilfoyle.png" },
			{ name: "Linday S.", url:"" },
			{ name: "Jared D.", url:"http://www.piedpiper.com/app/themes/pied-piper/dist/images/jared.png" }
		]
	},
	{
		date: "Tomorrow",
		employees: [
			{ name: "Linday S.", url:"" },
			{ name: "Bertram G.", url:"http://www.piedpiper.com/app/themes/pied-piper/dist/images/gilfoyle.png" },
			{ name: "Jared D.", url:"http://www.piedpiper.com/app/themes/pied-piper/dist/images/jared.png" },
			{ name: "Ben D.", url:"" },
			{ name: "Ben D.", url:"" },
			{ name: "Ben D.", url:"" }
		]
	}];
}
