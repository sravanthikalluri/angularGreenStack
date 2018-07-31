'use strict';

require('./secret-question-modal.component.scss');

module.exports = {
	template: require('./secret-question-modal.component.html'),
	controller: SecretQuestionModalController,
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

function SecretQuestionModalController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		var modalData = ctrl.resolve.data;
		ctrl.showFullSpinner = false;
		ctrl.securityQuestions = modalData.secretQuestion;

		ctrl.data = {
			name: modalData.name,
			method: modalData.secretQuestion ? 'PUT' : 'POST',
			payload: {
				employeeId: modalData.employeeId,
				question: '',
				answer: ''
			}
		};
	};

	ctrl.onCancel = function() {
    	ctrl.modalInstance.dismiss(ctrl.data);
    };

    ctrl.onSave = function(formName) {
    	if(ctrl.data.payload.ownQuestion){
			ctrl.data.payload.question = ctrl.data.payload.ownQuestion;
			delete ctrl.data.payload.ownQuestion;
    	}else{
    		delete ctrl.data.payload.ownQuestion;
    		ctrl.data.payload.question = ctrl.data.payload.question.question;
    	}

	  if (formName.$valid) {
		ctrl.modalInstance.close(ctrl.data);
		ctrl.showFullSpinner = false;
	  }
    };
}
