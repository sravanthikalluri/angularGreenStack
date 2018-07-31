module.exports = {
  templateUrl: 'app/main/team/team.component.html',
  controller: teamController
};

require('./team.component.scss');


function teamController(){
	var ctrl = this;
	ctrl.leaveTableTitles = [
		'Employee',
		'Dates Requested',
		'Time Requested'
	];
	ctrl.leaveTableData = [{
		employee: 'Ikram Kella',
		datesRequested: 'Feb 18-22',
		timeRequested: '4 Days'
	},{
		employee: 'Maggie Melo',
		datesRequested: 'March 2',
		timeRequested: '3 hours'
	},{
		employee: 'Maggie Melo',
		datesRequested: 'March 2',
		timeRequested: '1 Day'
	},{
		employee: 'Ikram Kella',
		datesRequested: 'Feb 18-22',
		timeRequested: '4 Days'
	},{
		employee: 'Maggie Melo',
		datesRequested: 'March 2',
		timeRequested: '3 hours'
	},{
		employee: 'Maggie Melo',
		datesRequested: 'March 2',
		timeRequested: '1 Day'
	},{
		employee: 'Ikram Kella',
		datesRequested: 'Feb 18-22',
		timeRequested: '4 Days'
	},{
		employee: 'Maggie Melo',
		datesRequested: 'March 2',
		timeRequested: '3 hours'
	}];

	ctrl.expenseTableTitles = [
		'Employee',
		'Submitted',
		'Report Name',
		'Amount'
	];
	ctrl.expenseTableData = [{
		employee: 'Ikram Kella',
		datesRequested: 'Jan 16',
		reportName: 'Q1 San Mateo Trip',
		amount: '$1,942.13'
	},{
		employee: 'Maggie Melo',
		datesRequested: 'Feb 3',
		reportName: 'Feb Sales Conference',
		amount: '$683.10'
	},{
		employee: 'Maggie Melo',
		datesRequested: 'Feb 3',
		reportName: 'NYC Trip',
		amount: '$2,682.51'
	},{
		employee: 'Ikram Kella',
		datesRequested: 'Jan 16',
		reportName: 'Q1 San Mateo Trip',
		amount: '$1,942.13'
	}];
}
