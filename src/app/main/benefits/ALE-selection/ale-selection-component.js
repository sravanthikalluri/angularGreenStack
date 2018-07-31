'use strict';

require('./ale-selection-component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/ALE-selection/ale-selection-component.html',
	controller: ['DS',aleSelectionController]
};

function aleSelectionController(DS) {
	var ctrl = this;
	ctrl.yesActive = false;
	ctrl.active = false;
	ctrl.showSection = false;
	ctrl.showAnswerHowtoDetermine = false;
	ctrl.finalSection = false;
	ctrl.showMore = false;
	ctrl.showLess = true;
	ctrl.submit = function(){
		var data = {
			"aleStatus": ctrl.yesActive ? 'Y' : 'N'
		};
		DS.create('ale-selection',data).then(function (response) {
			ctrl.finalSection = true;
			ctrl.showSection = false;
		}).catch(function (err) {
			ctrl.showSection = false;
			ctrl.error = err;
		})
	}
}
