module.exports = {
    template: "<button ng-class=\"{'tn-action-btn':$ctrl.type === 'action', 'tn-btn' : $ctrl.type !== 'action'}\"" +
            " ng-click=$ctrl.onClick() ng-disabled=!$ctrl.isDisabled aria-label='{{$ctrl.text}}' name='tn-button'>{{$ctrl.text}}</button>",
    controller: tnButtonController,
    bindings: {
      text: '@',
      type: '@',
      onClick: '&',
	  isDisabled: '='
    }
};

require('./tn-button.component.scss')

function tnButtonController() {
  var ctrl = this;

};

