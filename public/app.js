

var Tasks = function(){
	var self = this;
	self.tasks = ko.observableArray([]);
	self.addTask = function(){
		app.showAddTask();
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
 var AddTask = function(){
 	var self = this;
 	self.title = ko.observable('');
 	self.text = ko.observable('');

 	self.add = function(){
	 	var newTask = {
	 			title: self.title(),
	 			text: self.text()
	 	};
	 	$.ajax({
	 		method: "POST",
	 		url : "/api/tasks",
	 		contentType : "application/json",
	 		data : JSON.stringify(newTask)
			}).then(function(json){
				app.showTasks();
		})
		}
	self.activate = function(){
	

	}		
		self.template = 'addTask';

 }

var Projects = function(){
	var self = this;
	self.projects = ko.observableArray([]);
	self.addProject = function(){
		app.showAddProject();
	}
	self.removeProject = function(project){
			$.ajax({
			url : '/api/projects/' + project.id,
			type : 'DELETE'
		}).then(function(json){
			self.projects.remove(project)
		})
	}
	self.activate = function(){

		$.ajax ({
			method: "GET",
			url : "/api/projects",
		}).then(function(json){
			self.projects(json);
		})
	}
	self.template = 'projects';
}


var AddProject = function(){
	var self = this;
	self.title = ko.observable('');
	self.text = ko.observable('');

	self.add = function(){
	 	var newProject = {
	 			title: self.title(),
	 			text: self.text()
	 	};
	 	$.ajax({
	 		method: "POST",
	 		url : "/api/projects",
	 		contentType : "application/json",
	 		data : JSON.stringify(newProject)
			}).then(function(json){
				app.showProjects();
		})
		}
	self.activate = function(){
	

	}		
		self.template = 'addProject';
}



var app = {
	content : ko.observable(null),
	showTasks : function(){
		app.content(new Tasks())
		app.content().activate();
	},
	showAddTask : function(){
		app.content(new AddTask())
		app.content().activate();
	},
	showProjects : function(){
		app.content(new Projects())
		app.content().activate();
	},
	showAddProject : function(){
		app.content(new AddProject())
		app.content().activate();
	}
}


$(function(){
$.ajaxSetup({ cache: false });
ko.applyBindings(app);
app.showProjects();
})