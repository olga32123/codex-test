define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');
    var router = require('plugins/router');
    var dialog = require('plugins/dialog');

    var CustomModal = function() {
        	
 	var self = this;
 	self.title = ko.observable('');
 	self.text = ko.observable('');

 	self.add = function(){
	 	var newTask = {
	 			title: self.title(),
	 			text: self.text()
	 		
	 	};

	 	var projectId = router.activeInstruction().params[0]
	 	
	 	$.ajax({
	 		method: "POST",
	 		url : "/api/projects/" + projectId + "/tasks",
	 		contentType : "application/json",
	 		data : JSON.stringify(newTask)
			}).then(function(json){
			// router.navigate("#/projects/" + projectId + "/tasks");
			dialog.close(self, json);	
		})
		}
	self.activate = function(){
	

	}		

 };



   CustomModal.show = function(){
        return dialog.show(new CustomModal());
    };
 
    return CustomModal;
});