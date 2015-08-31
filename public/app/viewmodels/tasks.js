define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');
    var router = require('plugins/router');
    var AddTask = require('./addTask')


    return function(){
	var self = this;
	self.tasks = ko.observableArray([]);
	self.projectName = ko.observable("project: -");
	self.projectId = ko.observable('');
	self.taskId = ko.observable('');
	self.addTask = function(){
		AddTask.show().then(function(data){
			self.tasks.push(data);
		});
	}

	self.removeTask = function(task){
		var taskId = task.id;
		var projectId = self.projectId();

		$.ajax({
			url : '/api/projects/' + projectId + '/tasks/' + taskId,
			type : 'DELETE'
		}).then(function(json){
			self.tasks.remove(task)
		})
	}
	self.activate = function(){
		var projectId = router.activeInstruction().params[0]
		self.projectId(projectId);
		$.ajax ({
			method: "GET",
			url : "/api/projects/" + projectId + "/tasks",
		}).then(function(json){
			self.tasks(json);
		})
		var id = router.activeInstruction().params[0]

		$.ajax ({
			method: "GET",
			url : "/api/projects/" + id,
		}).then(function(json){
			self.projectName("Project: " + json.title)
		})
	}
}
});