'use strict';

require('./tn-profile-menu.component.scss');

module.exports = {
    template: require('./tn-profile-menu.component.html'),
    controller: ['$state',TnProfileMenuController],
    transclude: true,
    bindings: {
      title: '@',
      subtitle: '@',
      profilePicture: '@',
      isActive: '=',
      isMenuActive: '=',
      home: '<'
    }
};

/** @ngInject */
function TnProfileMenuController($state) {
    var ctrl = this;

};
