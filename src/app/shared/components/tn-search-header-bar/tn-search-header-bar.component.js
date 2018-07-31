require('./tn-search-header-bar.component.scss')

module.exports = {
	template: require('./tn-search-header-bar.component.html'),
	controller: TnSearchHeaderBarController,
	bindings: {
		placeholder: '@',
		title: '@',
		subTitle: '@',
		search: '<',
		action:'&',
		state: '@'
	}
};

function TnSearchHeaderBarController() {
	var ctrl = this;
}
