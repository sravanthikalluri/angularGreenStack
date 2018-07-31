'use strict'

require('./tn-tabs.component.scss');

module.exports = {
	transclude: true,
	bindings: {
		sliderHeight: '=?',
		sliderWidth: '=?',
		selectedIndex: '=',
		activeTabChanged: '&'
	},
	controller: ['$element', '$timeout',TnTabsController],
	template: require('./tn-tabs.component.html')
};

/* @ngInject */
function TnTabsController($element, $timeout) {
	var ctrl = this;
	ctrl.activeIndex = 0;
	ctrl.tabs = [];

	var sliderOffset = 0;

	ctrl.$onInit = function() {
		$timeout(function() {
			var elements = getElements();
			setSize(elements);
			setContentHeight(elements);
			findSliderOffset(elements);
			updateSlider(elements);
			updateTabs(elements, ctrl.activeIndex);
		});
	}

	//Fill tab proto functions and adds it to array
	ctrl.addTab = function(tab) {
		if(ctrl.tabs.length === 0) {
			tab.active = true;
		}

		tab.getIndex = function() { return ctrl.tabs.indexOf(tab); };
		tab.isActive = function() { return tab.getIndex() == ctrl.activeIndex; };
		tab.isLeft = function() { return tab.getIndex() < ctrl.activeIndex; };
		tab.isRight = function() { return tab.getIndex() > ctrl.activeIndex; };

		ctrl.tabs.push(tab);
	}

	ctrl.setActiveTab = function(tabIndex) {
		ctrl.activeIndex = tabIndex;

		var elements = getElements();
		updateTabs(elements);
		updateSlider(elements);
        ctrl.selectedIndex = tabIndex;
		ctrl.activeTabChanged({$event: {activeTab: tabIndex}});
	}

	//Dynamically set sizing of tab labels and slider
	function setSize(elements) {
		var perc = (100/ctrl.tabs.length);
		var height = ctrl.sliderHeight ? ctrl.sliderHeight : 2;
		var width = ctrl.sliderWidth ? ctrl.sliderWidth + 'px' : perc + '%';
		var top = (elements.tabsContainer.offsetHeight - height) + 'px';

		angular.forEach(elements.tabs, function(tab, index) {
			angular.element(tab).css({ width: perc + '%'});
			angular.element(elements.slider).css({
				width: width,
				height: height + 'px',
				top: top
			});
		})
	}

	//Set height of content container
	//Because tab content position is absolute for ease of animating it is removed from
	//layout flow and so the parent container must have it's height explicitly set to child
	//height
	function setContentHeight(elements) {
		var height = 0;

		angular.forEach(elements.content, function(tab, index) {
			if(tab.offsetHeight > height) {
				height = tab.offsetHeight;
			}
		});

		angular.element(elements.contentContainer).css({height: height + 'px'});
	}

	function findSliderOffset(elements) {
		if(ctrl.sliderWidth) {
			var p = 100/ctrl.tabs.length;
			var sw = ctrl.sliderWidth;
			var tw = elements.tabsContainer.offsetWidth;
			sliderOffset = (p * tw - 100 * sw) / (2 * tw);
		}
	}

	function updateSlider(elements) {
		var tab = elements.tabs[ctrl.activeIndex];
		var p = 100/ctrl.tabs.length;

		angular.element(elements.slider).css({ left: (p * ctrl.activeIndex + sliderOffset) + '%'});
	}

	function updateTabs(elements) {
		//Set z-index so tab content can be interacted with
		angular.forEach(elements.content, function(tab, index) {
			if (index == ctrl.activeIndex) {
				angular.element(tab).addClass("active-tab");
			} else {
				angular.element(tab).removeClass("active-tab");
			}
		})
	}

	function getElements() {
		var elements = [];
		var node = $element[0];
		elements.tabsContainer = node.querySelector('div.tabs-label-content');
		elements.tabs = elements.tabsContainer.querySelectorAll('label.tab-label');
		elements.slider = node.querySelector('div.slider');
		elements.contentContainer = node.querySelector('div.tab-content-container');
		elements.content = elements.contentContainer.querySelectorAll('tn-tab');

		return elements;
	}
}
