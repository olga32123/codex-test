define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');
    var router = require('plugins/router');



return  function(){
	var self = this;
	self.title = ko.observable();
	self.text = ko.observable();
	self.comments = ko.observableArray([]);
	self.projectId = ko.observable('');
	self.taskId = ko.observable('');

	self.name = ko.observable();
	self.message = ko.observable('');

	self.status = ko.observable('inprogress');
	self.editMode = ko.observable(false);

	self.addMessage = function(){
		var projectId = router.activeInstruction().params[0]
    	var taskId = router.activeInstruction().params[1]

	 	var newComment = {
	 			name: self.name(),
	 			message: self.message(),
	 			taskId: taskId
	 	};
	 	$.ajax({
	  		method : "POST",
	  		url : "/api/projects/" + projectId + "/tasks/" + taskId + "/comments",
	  		contentType : 'application/json',
			data : JSON.stringify(newComment)
		}).then(function(json){
			self.comments.push(json);
			self.name('');
			self.message('');
		})
	}

	self.removeComment = function(comment){
		var projectId = router.activeInstruction().params[0]
    	var taskId = router.activeInstruction().params[1]
		$.ajax({
			url : "/api/projects/" + projectId + "/tasks/" + taskId + "/comments/"+ comment.id,
			type : 'DELETE'
		}).then(function(json){
			self.comments.remove(comment)
		})
	}
    self.activate = function(){
    	    var projectId = router.activeInstruction().params[0]
    	    var taskId = router.activeInstruction().params[1]
    	    self.projectId(projectId);

            $.ajax({
                method: "GET",
                url : "/api/projects/" + projectId + "/tasks/" + taskId,
            }).then(function(json){
            	self.title(json.title);
            	self.text(json.text);
            	self.status(json.status);

                
            })
            $.ajax ({
			method: "GET",
			url : "/api/projects/" + projectId + "/tasks/" + taskId + "/comments",
		}).then(function(json){
				self.comments(json);

            })
    }
}

});
