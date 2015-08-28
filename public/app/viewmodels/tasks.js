define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');

    return function(){
	var self = this;
	self.tasks = ko.observableArray([]);
	self.addTask = function(){
	
	}
	self.removeTask = function(task){
		$.ajax({
			url : '/api/tasks/' + task.id,
			type : 'DELETE'
		}).then(function(json){
			self.tasks.remove(task)
		})
	}
	self.activate = function(){

		$.ajax ({
			method: "GET",
			url : "/api/tasks",
		}).then(function(json){
			self.tasks(json);
		})
	}
	self.template = 'tasks';
}
});