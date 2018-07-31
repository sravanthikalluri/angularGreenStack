'use strict';

require('./company-annoucements-card.scss');

module.exports = {
	template: require('./company-annoucements-card.component.html'),
	controller: ['$timeout', 'DS', '$state' , '$filter',CompanyAnnouncemtsCardController]
};

function CompanyAnnouncemtsCardController($timeout, DS, $state , $filter) {
	var ctrl = this;

	ctrl.$onInit = function() {
		DS.find('companyAnnouncements', '').then(function(results){
			ctrl.announcements = results.res;
			if (results.res) {
				var keys = Object.keys(results.res);
				var arr = [];
				keys.map(function (keyName, index) {
					if (keyName !== 'future' && keyName !== 'history') {
						arr = arr.concat(results.res[keyName]);
					}

				});
				ctrl.announcementsLength = arr.length;
				ctrl.currentAnnouncements = arr.slice(0, 3);
				ctrl.setFullCurrentAnnouncements = angular.copy(ctrl.currentAnnouncements);
				ctrl.currentAnnouncementsLength = ctrl.currentAnnouncements.slice(0, 3).length;
				ctrl.showMore();
			}
		}).catch(function(err) {
			ctrl.currentAnnouncements = [];
			ctrl.announcements = [];
			ctrl.announcementsLength = 0;
			ctrl.currentAnnouncementsLength = 0;
		});

		ctrl.showSpinner = true;
	};

	ctrl.showMore = function(){
		ctrl.setFullCurrentAnnouncements.map(function (announcement) {
			if (announcement.title.length > 65) {
				announcement.isShowMore = true;
				announcement.isShowLess = false;
				//ctrl.showFullText = angular.copy(announcement.title);
				announcement.title = announcement.title.slice(0 , 65) + "... ";
			}else{
				announcement.isShowMore = false;
                announcement.isShowLess = false;
			}
		});
	};

	ctrl.more = function(announcement, index){
		announcement.isShowMore = false;
        announcement.isShowLess = true;
		announcement.title = ctrl.currentAnnouncements[index].title;
		angular.element(document.querySelector('a#less')).focus();
	};

	ctrl.less = function(announcement, index){
		announcement.isShowMore = true;
        announcement.isShowLess = false;
		announcement.title = announcement.title.slice(0 , 65) + " ... ";
		angular.element(document.querySelector('a#more')).focus();
	};

	ctrl.showAnnouncements = function () {
		$state.transitionTo('app.main.company-announcements', {id: ctrl.announcements});
	};

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 2000);
}
