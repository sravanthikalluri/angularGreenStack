'use strict';

require('./work-inbox-card.component.scss');

module.exports = {
	template: require('./work-inbox-card.component.html'),
	controller: ['$window','$location', 'DS',WorkInboxCardController]
};

/* @ngInject */
function WorkInboxCardController($window,$location, DS) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		DS.find('work-inbox', '/items?task=assignedToMe').then(function (results) {
			ctrl.showSpinner = false;
			ctrl.assignedTasks = filterTasks(results.workInbox);
			ctrl.currentworkInboxAssignedItems = filterTasks(results.workInbox).slice(0, 5);
			ctrl.currentworkInboxAssignedItems = ctrl.currentworkInboxAssignedItems.reduce(function (source, dest) {
				if (!source.length) {
					source.push({headerName: dest.headerName, subHeadings: [{name: dest.name,data :dest.data}]});
				} else {
					var index = source.findIndex(function (_obj) { return _obj.headerName === dest.headerName});
					if (index === -1) {
						source.push({headerName: dest.headerName, subHeadings: [{name: dest.name,data :dest.data}]});
					} else {
						source[index].subHeadings.push({name: dest.name,data :dest.data});
					}
				}
				return source;
			}, []);
		}).catch(function (error) {
			ctrl.showSpinner = false;
			ctrl.workInboxItems = [];
			console.log(error);
		});

		DS.find('work-inbox', '/items?task=UnAssigned').then(function (results) {
			ctrl.showSpinner = false;
			ctrl.unAssignedTasks = filterTasks(results);
			ctrl.currentworkInboxUnAssignedItems = filterTasks(results).slice(0, 5);
		}).catch(function(error) {
			ctrl.showSpinner = false;
			ctrl.workInboxItems = [];
			console.log(error);
		});

	};

	function filterTasks(tasks){
		if (Array.isArray(tasks)) {
			return tasks.map(function (obj) {
				return obj.catagory.filter(function (item) {
					item.data.length ? item.headerName = obj.name : '';
					return item.data.length;
				})
			}).reduce(function (source, dest) {
				return source.concat(dest);
			}, []);
		} else {
			return tasks.catagory.filter(function(item){
				return item.data.length;
			});
		}
	}

	// redirect to admin view work inbox items.
	ctrl.showAssignedItems = function () {
		$window.sessionStorage.setItem('switchWorkInbox',true);
		$window.open($location.protocol()+'://'+$location.host()+'/admin','_self');
	};

	ctrl.showUnAssignedItems = function () {
		$window.sessionStorage.setItem('switchWorkInbox',true);
		$window.sessionStorage.setItem('unAssignedItems',true);
		$window.open($location.protocol()+'://'+$location.host()+'/admin','_self');
	};

}
